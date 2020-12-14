import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, removeItem } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import {FooterContainer} from "../containers/footer";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} item(s)</h2>
                <hr />
                    {items.map((product, i) => (
                        <Card
                            key={i}
                            product={product}
                            showAddToCartButton={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                            setRun={setRun}
                            run={run}
                        />
                    ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Oh no! Your cart is empty.
            <br />
            <br />
            <Link className = "link" to="/shop"> Let's shop and fill the cart up!</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
                <div className="col-1"></div>
                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>

            </div>
            <br/>
            <FooterContainer />
        </Layout>
    );
};

export default Cart;