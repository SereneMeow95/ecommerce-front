import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import {getNews} from "./apiCore";
import NewsCard from "./NewsCard";
import NewsSearch from "./NewsSearch";
import {FooterContainer} from "../containers/footer";

const News = () => {
    const [newsByPublishedDate, setNewsByPublishedDate] = useState([])
    const [error, setError] = useState(false)
    const [run, setRun] = useState(false);

    const loadNewsByPublishedDate = () => {
        getNews('updatedAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setNewsByPublishedDate(data)
            }
        });
    };

    useEffect(() => {
        loadNewsByPublishedDate();
    }, []);

    return (
        <Layout
            title = "News"
            description = "Latest News"
            className="container-fluid"
        >
            {/*<NewsSearch />*/}
            <h1 className="text-center font mb-4">LATEST NEWS</h1>
            <div className="row">
                {newsByPublishedDate.map((news, i) => (
                    <div key={i} className="col-6 mb-5">
                        <NewsCard news={news} />
                    </div>
                ))}
            </div>
            <br/>
            {/*{JSON.stringify(newsByPublishedDate)}*/}
            <FooterContainer />
        </Layout>
    );
};

export default News;