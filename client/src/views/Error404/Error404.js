import React, { Component } from "react";
import Error from "../../assets/images/404.avif"
import { Link } from "react-router-dom";
import './Error404.scss'

class Error404 extends Component {
    render() {
        return (
            <div className="Error404-container">
                <img src={Error} />
                <p>Sorry, the page you were looking for not found.</p>
                <Link to='/'>
                    Back to Home
                </Link>
            </div>
        )
    }
}

export default Error404;