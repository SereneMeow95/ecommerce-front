import React, {useState, useEffect} from 'react';
import {listNews} from "./apiCore";
import NewsCard from "./NewsCard";

const NewsSearch = () => {
    const [data, setData] = useState({
        search: "", //search keyword
        results: [], //results of search
        searched: false
    });

    const {search, results, searched} = data;

    const searchData = () => {
        console.log('search', search);
        if(search) {
            listNews({search: search || undefined})
                .then(response => {
                    if(response.error) {
                        console.log(response.error);
                    } else {
                        setData({...data, results: response, searched: true})
                    }
                });
        }
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({...data, [name]: event.target.value, searched:false});
    };

    const searchMessage = (searched, results) => {
        // if (searched && results.length !== 1 && results.length > 0) {
        //     return `Found ${results.length} products`;
        // }
        //
        if (searched && results.length > 0) {
            return `Found ${results.length} news`;
        }

        if (searched && results.length < 1) {
            return `Oops! No related news :(`;
        }
    };

    const searchedNews = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((news, i) => (
                        <NewsCard key={i} news={news} />
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3">
                {searchedNews(results)}
            </div>
        </div>
    );
};

export default NewsSearch;