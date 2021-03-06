import React from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {FooterContainer} from "../containers/footer";

const AdminDashboard = () => {

    const {
        user: {_id, name, email, role}
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card text-center">
                <h4 className="card-header name-link">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/categories">
                            Manage Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/news">
                            Add News
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/news">
                            Manage News
                        </Link>
                    </li>

                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header name-info">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Member"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`Good day, ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                {/*<div className="col-1"></div>*/}
                <div className="col-4">
                    {adminLinks()}
                </div>

                <div className="col-8">
                    {adminInfo()}
                </div>
            </div>
            <br/>
            <FooterContainer />
        </Layout>
    );
};

export default AdminDashboard;