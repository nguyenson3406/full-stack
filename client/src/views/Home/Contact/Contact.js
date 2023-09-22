import React, { Component } from "react";
import './Contact.scss'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <div className="title-content">
                    <h2>{i18next.t("home.contact.title")}</h2>
                </div>
                <div className="body-content">
                    <p><i className="fas fa-envelope"></i>{i18next.t("home.contact.email")}</p>
                    <p><i className="fas fa-phone"></i>{i18next.t("home.contact.phonenumber")}</p>
                    <p><i className="fas fa-map-marker-alt"></i>{i18next.t("home.contact.address")}</p>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Contact)