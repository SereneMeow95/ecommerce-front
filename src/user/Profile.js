import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect} from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const {
        name,
        email,
        password,
        confirmPassword,
        error,
        success
    } = values;

    const init = userId => {
        //console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            //console.log('NO');
            return
        } else {
            update(match.params.userId, token, {name, email, password}).then(data => {
                if (data.error) {
                    console.log(data.error);
                    setValues({...values, error: data.error, success: false})
                    //alert(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            password: '',
                            confirmPassword: '',
                            error: '',
                            success: true
                        });
                    });
                }
            });
        };
    };

    // const redirectUser = success => {
    //     if (success) {
    //         return <Redirect to="/cart" />;
    //     }
    // };

    const goBack = () => (
        <div className="text-center mt-3">
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <Link to="/user/dashboard" className="text-index">
                    Return to Dashboard
                </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <Link to="/admin/dashboard" className="text-index">
                    Return to Dashboard
                </Link>
            )}
        </div>
    );

    const profileUpdate = (name, email, password) => (
        <form>
            {/*<div className="form-group">*/}
            {/*    <label className="text-muted">Name</label>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        onChange={handleChange('name')}*/}
            {/*        className="form-control"*/}
            {/*        value={name}*/}
            {/*    />*/}
            {/*</div>*/}

            {isAuthenticated().user.role === 0 && (
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        readOnly
                    />
                </div>
            )}

            {/*{isAuthenticated().user.role === 1 && (*/}
            {/*    <div className="form-group">*/}
            {/*        <label className="text-muted">Email</label>*/}
            {/*        <input*/}
            {/*            type="email"*/}
            {/*            className="form-control"*/}
            {/*            value={email}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}

            {isAuthenticated().user.role === 1 && (
                <div className="form">
                    <input
                        onChange={handleChange('email')}
                        type="email"
                        // name="name"
                        value={email}
                        autoComplete="off"
                        required/>
                    <label htmlFor="email" className="label-name">
                        <span className="content-name">Name</span>
                    </label>
                </div>
            )}


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

            {/*<div className="form">*/}
            {/*    <input*/}
            {/*        onChange={handleChange('email')}*/}
            {/*        type="email"*/}
            {/*        // name="name"*/}
            {/*        value={email}*/}
            {/*        autoComplete="off"*/}
            {/*        required/>*/}
            {/*    <label htmlFor="email" className="label-name">*/}
            {/*        <span className="content-name">Email</span>*/}
            {/*    </label>*/}
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

            <br />
            <div className="text-center">
                <button onClick = {clickSubmit} className = "btn btn-outline-success btn-square" type="submit" >
                    Update
                </button>
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
            className="alert alert-success"
            style={{display: success ? '' : 'none'}}
        >
            {/*New account is created. Please <Link to="/signin">Signin</Link>*/}
            Updated successfully!
        </div>
    )

    return (
        <Layout
            title="Profile"
            description="Update your profile"
            // className="container-fluid"
            className = "container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {/*<h2 className="mb-4">Profile update</h2>*/}
            {profileUpdate(name, email, password)}
            <br/>
            {goBack()}
            {/*{redirectUser(success)}*/}
        </Layout>
    );
};

export default Profile;