import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getNews, deleteNews } from "./apiAdmin";

const ManageNews = () => {

    const [news, setNews] = useState([]);
    const { user, token } = isAuthenticated();

    const loadNews = () => {
        getNews().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setNews(data);
            }
        });
    };

    const destroy = newsId => {
        deleteNews(newsId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadNews();
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
        loadNews();
    }, []);

    return (
        <Layout
            title="Manage News"
            description="Perform CRUD on news"
            className="container-fluid"
        >
            {goBack()}
            <br/>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {news.length} News
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {news.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.newsTitle}</strong>
                                <Link to={`/admin/news/update/${p._id}`}>
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

export default ManageNews;