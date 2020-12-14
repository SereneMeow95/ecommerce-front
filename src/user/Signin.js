import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from "../core/Layout";
import {signin, authenticate, isAuthenticated} from "../auth";

//signin page
const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false, //show loading when user is signing in
        redirectToReferrer: false //turn true after login successfully & redirect the user to other pages
    });

    const {email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
            .then(data => {
                if (data.error) {
                    setValues ({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    });
                }
            });
    };

    const signUpForm = () => (
        <form>

            <div className="form">
                <input
                    onChange={handleChange('email')}
                    type="email"
                    // name="name"
                    value={email}
                    autoComplete="off"
                    required/>
                <label htmlFor="email" className="label-name">
                    <span className="content-name">Email</span>
                </label>
            </div>

            <div className="form">
                <input
                    onChange={handleChange('password')}
                    type="password"
                    // name="name"
                    value={password}
                    autoComplete="off"
                    required/>
                <label htmlFor="password" className="label-name">
                    <span className="content-name">Password</span>
                </label>
            </div>

            <br />
            <div className="text-center">
                <button onClick = {clickSubmit} className = "btn btn-info btn-square" >Sign In</button>
            </div>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    //redirect user to related dashboard
    const redirectUser = () => {
        if(redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };


    return (
        <Layout
            title = "Signin Page"
            description = "Autism Care Ecommerce Web App Signin Page"
            className = "container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
};

export default Signin;


