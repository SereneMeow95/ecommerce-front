import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from "../core/Layout";
import {signup} from "../auth";

//signup page
const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: false
    });

    const {name, email, password, confirmPassword, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        console.log('OKAY');
        if(password !== confirmPassword) {
            alert('Passwords do not match');
            //console.log('NO');
            return
        } else {
            //console.log("YAS");
            signup({name, email, password, confirmPassword})
                .then(data => {
                    //console.log("YAS1");
                    if (data.error) {
                        console.log('NO1');
                        setValues({...values, error: data.error, success: false})
                    } else {
                        //console.log("YAS2");
                        setValues({
                            ...values,
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            error: '',
                            success: true
                        })
                    }
                })
        }
    };

    const signUpForm = () => (
        <form>
            <div className="form">
                <input
                    onChange={handleChange('name')}
                    type="text"
                    // name="name"
                    value={name}
                    autoComplete="off"
                    required/>
                <label htmlFor="name" className="label-name">
                    <span className="content-name">Name</span>
                </label>
            </div>

            {/*<div className="form-group">*/}
            {/*    <label className = "text-muted">Name</label>*/}
            {/*    <input*/}
            {/*        onChange={handleChange('name')}*/}
            {/*        type="text"*/}
            {/*        className="form-control"*/}
            {/*        value={name}*/}
            {/*    />*/}
            {/*</div>*/}

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

            {/*<div className="form-name">*/}
            {/*    <label className = "text-muted">Email</label>*/}
            {/*    <input*/}
            {/*        onChange={handleChange('email')}*/}
            {/*        type="email"*/}
            {/*        className="form-control"*/}
            {/*        value={email}*/}
            {/*    />*/}
            {/*</div>*/}

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

            {/*<div className="form-name">*/}
            {/*    <label className = "text-muted">Password</label>*/}
            {/*    <input*/}
            {/*        onChange={handleChange('password')}*/}
            {/*        type="password"*/}
            {/*        className="form-control"*/}
            {/*        value={password}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="form">
                <input
                    onChange={handleChange('confirmPassword')}
                    type="password"
                    // name="name"
                    value={confirmPassword}
                    autoComplete="off"
                    required/>
                <label htmlFor="confirmPassword" className="label-name">
                    <span className="content-name">Confirm Password</span>
                </label>
            </div>

            {/*<div className="form-name">*/}
            {/*    <label className = "text-muted">Confirm Password</label>*/}
            {/*    <input*/}
            {/*        onChange={handleChange('confirmPassword')}*/}
            {/*        type="password"*/}
            {/*        className="form-control"*/}
            {/*        value={confirmPassword}*/}
            {/*    />*/}
            {/*</div>*/}

            <br />
            <div className="text-center">
                <button onClick = {clickSubmit} className = "btn btn-primary" >Sign Up</button>
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

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{display: success ? '' : 'none'}}
        >
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    )

    return (
        <Layout
            title = "Signup Page"
            description = "Autism Care Ecommerce Web App Signup Page"
            className = "container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
};

export default Signup;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../core/Layout';
// import { signup } from '../auth';
//
// const Signup = () => {
//     const [values, setValues] = useState({
//         name: '',
//         email: '',
//         password: '',
//         error: '',
//         success: false
//     });
//
//     const { name, email, password, success, error } = values;
//
//     const handleChange = name => event => {
//         setValues({ ...values, error: false, [name]: event.target.value });
//     };
//
//     const clickSubmit = event => {
//         event.preventDefault();
//         setValues({ ...values, error: false });
//         signup({ name, email, password }).then(data => {
//             if (data.error) {
//                 setValues({ ...values, error: data.error, success: false });
//             } else {
//                 setValues({
//                     ...values,
//                     name: '',
//                     email: '',
//                     password: '',
//                     error: '',
//                     success: true
//                 });
//             }
//         });
//     };
//
//     const signUpForm = () => (
//         <form>
//             <div className="form-group">
//                 <label className="text-muted">Name</label>
//                 <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
//             </div>
//
//             <div className="form-group">
//                 <label className="text-muted">Email</label>
//                 <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
//             </div>
//
//             <div className="form-group">
//                 <label className="text-muted">Password</label>
//                 <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
//             </div>
//             <button onClick={clickSubmit} className="btn btn-primary">
//                 Submit
//             </button>
//         </form>
//     );
//
//     const showError = () => (
//         <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
//             {error}
//         </div>
//     );
//
//     const showSuccess = () => (
//         <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
//             New account is created. Please <Link to="/signin">Signin</Link>
//         </div>
//     );
//
//     return (
//         <Layout
//             title="Signup"
//             description="Signup to Node React E-commerce App"
//             className="container col-md-8 offset-md-2"
//         >
//             {showSuccess()}
//             {showError()}
//             {signUpForm()}
//         </Layout>
//     );
// };
//
// export default Signup;
