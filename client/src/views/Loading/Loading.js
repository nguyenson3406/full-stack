import React, { Component } from "react";
import './Loading.scss'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Loading extends Component {
    render() {
        return (
            <div className="Loading-container">
                <p>
                    <span>{i18next.t("loading")}
                        <i className="dot-1 fas fa-circle"></i>
                        <i className="dot-2 fas fa-circle"></i>
                        <i className="dot-3 fas fa-circle"></i>
                    </span>
                </p>
            </div>
        )
    }
}

export default withTranslation()(Loading)