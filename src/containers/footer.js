import React from 'react';
import Footer from '../core/footer';
import Icon from "../core/icons";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";

export function FooterContainer(){
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column>
                        <Footer.Title>Autism Care</Footer.Title>
                        <Link to="/" className="link">Home</Link>
                        <Link to="/shop" className="link">Shop</Link>
                        <Link to="/cart" className="link">Cart</Link>
                        <Link to="/news" className="link">News</Link>
                        {!isAuthenticated() && (<Link to="/signin" className="link">Sign In</Link>)}
                        {!isAuthenticated() && (<Link to="/signup" className="link">Sign Up</Link>)}
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Contact Us</Footer.Title>
                        <Footer.Body><Icon className="fas fa-phone"/>0322682106</Footer.Body>
                        <Footer.Body><Icon className="far fa-envelope"/>autismcare@gmail.com</Footer.Body>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Social</Footer.Title>
                        <Footer.Link href="http://facebook.com"><Icon className="fab fa-facebook-f" />Facebook</Footer.Link>
                        <Footer.Link href="http://instagram.com"><Icon className="fab fa-instagram" />Instagram</Footer.Link>
                    </Footer.Column>
                </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}