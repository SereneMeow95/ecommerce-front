import React, { useState } from 'react';
import {Link, Redirect} from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const NewsCard = (
    {
        news,
        showViewNewsButton = true,
    }) => {

    // const [redirect, setRedirect] = useState(false);

    const showViewButton = (showViewNewsButton) => {
        return (
            showViewNewsButton && (
                <Link to={`/news/${news._id}`} className="mr-2"> {/*link of button*/}
                    <button className="btn btn-outline-success btn-square mr-2 mb-2">
                        View More
                    </button>
                </Link>
            )
        );
    };

    // const shouldRedirect = redirect => {
    //     if (redirect) {
    //         return <Redirect to="/cart" />;
    //     }
    // };

    // const handleChange = productId => event => {
    //     setRun(!run); // run useEffect in parent Cart
    //     setCount(event.target.value < 1 ? 1 : event.target.value);
    //     if (event.target.value >= 1) {
    //         updateItem(productId, event.target.value);
    //     }
    // };

    return (
        <div className="card">
            <div className="card-header name-news text-center">{news.newsTitle}</div>
            <div className="card-body">
                {!showViewNewsButton && (
                    <ShowImage item={news} url="news" />
                )}
                {showViewNewsButton && (
                    <p className="lead mt-2">
                        {news.description.substring(0, 100)}...
                    </p>
                )}
                {!showViewNewsButton && (
                    <p className="lead mt-2">
                        {news.description.substring(0, 10000)}
                    </p>
                )}
                <p className="black-7">
                    &nbsp;Last update: {moment(news.updatedAt).fromNow()}
                </p>
                <p className="black-8">
                    &nbsp;Published: {moment(news.createdAt).fromNow()}
                </p>
                {showViewButton(showViewNewsButton)}
            </div>
        </div>
    );
};

export default NewsCard;