import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import {getProducts} from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import {isAuthenticated} from "../auth";
import {FooterContainer} from "../containers/footer";

//home page
const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)
    const [run, setRun] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title = "Home Page"
            description = "Autism Care Ecommerce Web App"
            className="container-fluid"
        >
            <Search />
            <h1 className="text-center font mb-4">NEW ARRIVALS</h1>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-2 mb-5">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <br/>
            <br/>
            <h1 className="text-center font mb-4">BEST SELLERS</h1>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-2 mb-3">
                        <Card product={product} />
                        {/*{!isAuthenticated().user.role === 1 && (*/}
                        {/*    <Card product={product} />*/}
                        {/*)}*/}

                        {/*{isAuthenticated() && isAuthenticated().user.role === 1 && (*/}
                        {/*<Card*/}
                        {/*    key={i}*/}
                        {/*    product={product}*/}
                        {/*    showAddToCartButton={false}*/}
                        {/*    cartUpdate={false}*/}
                        {/*    showRemoveProductButton={false}*/}
                        {/*    setRun={setRun}*/}
                        {/*    run={run}*/}
                        {/*/>*/}
                        {/*)}*/}

                    </div>
                ))}
            </div>
            <FooterContainer />
        </Layout>
    );
};

export default Home;