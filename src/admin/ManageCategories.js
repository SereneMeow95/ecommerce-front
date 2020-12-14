import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {deleteCategory, getCategories} from "./apiAdmin";

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const { user, token } = isAuthenticated();

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const destroy = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadCategories();
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
        loadCategories();
    }, []);

    return (
        <Layout
            title="Manage Categories"
            description="Perform CRUD on Categories"
            // className="container-fluid"
            className = "container col-md-8 offset-md-2"
        >
            {goBack()}
            <br/>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {categories.length} Categories
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {categories.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                <Link to={`/admin/category/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageCategories;