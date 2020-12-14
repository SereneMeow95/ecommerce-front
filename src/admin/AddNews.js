import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {createNews} from "./apiAdmin";

const AddNews = () => {

    const [values, setValues] = useState({
        newsTitle: '',
        description: '',
        photo: '',
        loading: false,
        error: '',
        createdNews: '',
        // redirectToProfile: false,
        formData: ''
    });

    const {user, token} = isAuthenticated();

    const {
        newsTitle,
        description,
        loading,
        error,
        createdNews,
        // redirectToProfile,
        formData
    } = values;

    //run when everytime theres a change
    useEffect(() => {
        // init();
        setValues({...values, formData: new FormData()})
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});
        window.setTimeout(function(){window.location.reload()}, 2000);

        createNews(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    console.log('NO');
                    setValues({...values, error: data.error});
                } else {
                    console.log('YAS');
                    setValues({
                        ...values,
                        newsTitle: '',
                        description: '',
                        photo: '',
                        loading: false,
                        createdNews: data.name
                    });
                    // window.setTimeout(function(){window.location.reload()}, 3000);
                }
            });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <label className="text-muted">Photo</label>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange('photo')}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>

            {/*<div className="form-group">*/}
            {/*    <label className="text-muted">Name</label>*/}
            {/*    <input*/}
            {/*        onChange={handleChange('name')}*/}
            {/*        type="text"*/}
            {/*        className="form-control"*/}
            {/*        value={name}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="form">
                <input
                    onChange={handleChange('newsTitle')}
                    type="text"
                    // name="name"
                    value={newsTitle}
                    autoComplete="off"
                    required/>
                <label htmlFor="newsTitle" className="label-name">
                    <span className="content-name">News Title</span>
                </label>
            </div>

            {/*<div className="form-group">*/}
            {/*    <label className="text-muted">Description</label>*/}
            {/*    <textarea*/}
            {/*        onChange={handleChange('description')}*/}
            {/*        className="form-control"*/}
            {/*        value={description}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="form">
                <input
                    onChange={handleChange('description')}
                    type="textarea"
                    // name="name"
                    value={description}
                    autoComplete="off"
                    required/>
                <label htmlFor="description" className="label-name">
                    <span className="content-name">Description</span>
                </label>
            </div>

            <br/>

            <div className="text-center">
                <button className="btn btn-outline-success btn-square">Publish</button>
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
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{display: createdNews ? '' : 'none'}}
        >
            <h2>{`${createdNews}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )

    const goBack = () => (
        <div className="text-center mt-3">
            <Link to="/admin/dashboard" className="text-index">
                Return to Dashboard
            </Link>
        </div>
    );


    return (
        <Layout
            title="Create News"
            description={`Good day, ${user.name}! What news today?`}
        >
            {goBack()}
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    <br/>
                </div>

            </div>
        </Layout>
    );
};

export default AddNews;