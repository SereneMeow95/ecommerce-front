import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import Card from "./Card";
import {getCategories, getFilteredProducts} from './apiCore';
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import {prices} from "./fixedPrices";
import {FooterContainer} from "../containers/footer";


const Shop = () => {
    const [myFilters, setMyFilters] = useState ({
        filters: {category: [], price: []}
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(12);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        //console.log(newFilters);
        getFilteredProducts(0, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        //console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <div className="text-center">
                    <button onClick={loadMore} className="btn btn-square btn-warning mb-5">
                        MORE PRODUCTS
                    </button>
                </div>
            )
        );
    };

    //use when the components mount
    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        //console.log("SHOP", filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    //to get the price range array by price id
    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title = "Shop Page"
            description = "Search for your desired item! :)"
            className="container-fluid"
        >
            <div className="row">
                <div className="font col-2 ml-4">
                    <h3>Filter by Categories</h3>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")}
                        />
                    </ul>

                    <br/>
                    <br/>

                    <h3>Filter by Price Range</h3>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")}
                        />
                    </div>
                </div>

                <div className="col-9 ml-5">
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-3 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
            <FooterContainer />
        </Layout>
    );
};

export default Shop;