import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import {readNews} from "./apiCore";
import NewsCard from "./NewsCard";
import {Link} from "react-router-dom";
import {FooterContainer} from "../containers/footer";

const SingleNews = (props) => {
    const [singleNews, setSingleNews] = useState({});
    const [error, setError] = useState(false);

    const loadSingleNews = newsId => {
        readNews(newsId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSingleNews(data);
            }
        });
    };

    useEffect(() => {
        const newsId = props.match.params.newsId;
        loadSingleNews(newsId);
    }, [props]);

    const goBack = () => (
        <div className="text-center mt-3">
            <Link to="/news" className="text-index">
                Go Back To Previous Page
            </Link>
        </div>
    );

    return (
        <Layout
            title = {singleNews && singleNews.newsTitle}
            description = ""
            className="container-fluid"
        >
            {goBack()}
            <br/>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    {
                        singleNews &&
                        singleNews.description &&
                        (
                            <NewsCard news={singleNews} showViewNewsButton={false} />
                        )
                    }
                </div>
                <div className="col-2"></div>
            </div>
            <br/>
            <FooterContainer/>
        </Layout>
    );
};

export default SingleNews;