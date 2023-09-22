import React, { Component } from "react";
import Error from "../../assets/images/404.avif"
import { Link } from "react-router-dom";
import './Error404.scss'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Error404 extends Component {
    render() {
        return (
            <div className="Error404-container">
                <img src={Error} />
                <p>{i18next.t("error404.title-1")}</p>
                <Link to='/'>
                    {i18next.t("error404.title-2")}
                </Link>
            </div>
        )
    }
}

export default withTranslation()(Error404);