import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from "./cartHelpers";
import Icons from "./icons";
import Icon from "./icons/styles/icons";

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#FCE181'}; //where the user is, orange
    } else {
        return {color: '#9FEDD7'}; //the other, white
    }
};

const Menu = ({history}) => (
    <div>
        <ul className = "nav nav-tabs"> {/*Navigation bar*/}
            <li className = "nav-item">
                <Link
                    className = "nav-link"
                    style={isActive(history, "/")}
                    to = "/"
                >
                    {/*<Icon className="fas fa-phone"/>*/}
                    Home
                </Link>
            </li>

            <li className = "nav-item">
                <Link
                    className = "nav-link"
                    style={isActive(history, "/shop")}
                    to = "/shop"
                >
                    Shop
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>

            <li className = "nav-item">
                <Link
                    className = "nav-link"
                    style={isActive(history, "/news")}
                    to = "/news"
                >
                    News
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className = "nav-item">
                    <Link
                        className = "nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to = "/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className = "nav-item">
                    <Link
                        className = "nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to = "/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <ul className="nav nav-tabs ml-auto">
                    <li className = "nav-item">
                        <Link
                            className = "nav-link"
                            style={isActive(history, "/signin")}
                            to = "/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className = "nav-item">
                        <Link
                            className = "nav-link"
                            style={isActive(history, "/signup")}
                            to = "/signup"
                        >
                            Signup
                        </Link>
                    </li>
                    </ul>
                </Fragment>
            )}

            {isAuthenticated() && (
                <ul className="nav nav-tabs ml-auto">
                    <li className = "nav-item">
                    <span
                        className = "nav-link"
                        style={{cursor: 'pointer', color: '#9FEDD7'}}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                                localStorage.removeItem("cart");
                            })
                        }
                    >
                        Signout
                    </span>
                    </li>
                </ul>
            )}

        </ul>
    </div>
);

export default withRouter(Menu);