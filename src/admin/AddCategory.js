import React, {useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {createCategory} from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    };

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        //make request to api to create category
        window.setTimeout(function(){window.location.reload()}, 2000);
        createCategory(user._id, token, {name}).then(data => {
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        });

    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="text-muted">
                <h4>Category Name</h4>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-outline-success btn-square">
                    Create Category
                </button>
            </div>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created.</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique.</h3>;
        }
    };

    const goBack = () => (
        <div className="text-center mt-3">
            <Link to="/admin/dashboard" className="text-index">
                Return to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add Category"
            description={`Good day, ${user.name}! Ready to add a new category?`}
            className = "container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;