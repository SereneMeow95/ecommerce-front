import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {
    Link,
    //Redirect
} from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        //redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        //redirectToProfile,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const goBack = () => (
        <div className="text-center mt-3">
            <Link to="/admin/dashboard" className="text-index">
                Return to Dashboard
            </Link>
        </div>
    );

    useEffect(() => {
        init(match.params.productId);
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

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    error: false,
                    //redirectToProfile: true,
                    createdProduct: data.name
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

            <div className="form">
                <input
                    onChange={handleChange('price')}
                    type="number"
                    // name="name"
                    value={price}
                    autoComplete="off"
                    required/>
                <label htmlFor="price" className="label-name">
                    <span className="content-name">Price</span>
                </label>
            </div>

            <div className="form">
                <input
                    onChange={handleChange('quantity')}
                    type="number"
                    value={quantity}
                    autoComplete="off"
                    required/>
                <label htmlFor="quantity" className="label-name">
                    <span className="content-name">Quantity</span>
                </label>
            </div>

            <div className="form-group mt-4">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange('category')}
                    className="form-control"
                >
                    <option>Please select</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mt-4">
                <label className="text-muted">Shipping</label>
                <select
                    onChange={handleChange('shipping')}
                    className="form-control"
                >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            {/*<div className="form-group">*/}
            {/*    <label className="text-muted">Quantity</label>*/}
            {/*    <input*/}
            {/*        onChange={handleChange('quantity')}*/}
            {/*        type="number"*/}
            {/*        className="form-control"*/}
            {/*        value={quantity}*/}
            {/*    />*/}
            {/*</div>*/}


            <br/>

            <div className="text-center">
             <button className="btn btn-outline-success btn-square">Update Product</button>
            </div>


        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated successfully!</h2>
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
        <Layout title="Update Product" description={`G'day ${user.name}, please edit the product.`}>
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

export default UpdateProduct;