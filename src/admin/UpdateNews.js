import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {
    Link,
    //Redirect
} from 'react-router-dom';
import { getOneNews, updateNews } from './apiAdmin';

const UpdateNews = ({ match }) => {
    const [values, setValues] = useState({
        newsTitle: '',
        description: '',
        photo: '',
        loading: false,
        error: false,
        createdNews: '',
        //redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        newsTitle,
        description,
        loading,
        error,
        createdNews,
        //redirectToProfile,
        formData
    } = values;

    const init = newsId => {
        getOneNews(newsId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    newsTitle: data.newsTitle,
                    description: data.description,
                    formData: new FormData()
                });
            }
        });
    };

    // load categories and set form data
    // const initCategories = () => {
    //     getCategories().then(data => {
    //         if (data.error) {
    //             setValues({ ...values, error: data.error });
    //         } else {
    //             setCategories(data);
    //         }
    //     });
    // };

    const goBack = () => (
        <div className="text-center mt-3">
            <Link to="/admin/news" className="text-index">
                Return to News
            </Link>
        </div>
    );

    useEffect(() => {
        init(match.params.newsId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        window.setTimeout(function(){window.location.reload()}, 4000);

        updateNews(match.params.newsId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    newsTitle: '',
                    description: '',
                    photo: '',
                    loading: false,
                    error: false,
                    //redirectToProfile: true,
                    createdNews: data.name
                });
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
                    <span className="content-name">Title</span>
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

            {/*<div className="form-group">*/}
            {/*    <label className="text-muted">Price</label>*/}
            {/*    <input*/}
            {/*        onChange={handleChange('price')}*/}
            {/*        type="number"*/}
            {/*        className="form-control"*/}
            {/*        value={price}*/}
            {/*    />*/}
            {/*</div>*/}

            <br/>

            <div className="text-center">
                <button className="btn btn-outline-success btn-square">Update News</button>
            </div>

        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdNews ? '' : 'none' }}>
            <h2>{`${createdNews}`} is updated successfully!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    // const redirectUser = () => {
    //     //window.setTimeout(function(){window.location.reload()}, 2000);
    //     if (redirectToProfile) {
    //         //window.setTimeout(2000);
    //         if (!error) {
    //             //setTimeout(() => 10000);
    //             return <Redirect to="/" />;
    //         }
    //     }
    // };


    return (
        <Layout title="Update News" description={`G'day ${user.name}, wanna edit the news?`}>
            {goBack()}
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    <br/>
                    {/*{redirectUser()}*/}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateNews;