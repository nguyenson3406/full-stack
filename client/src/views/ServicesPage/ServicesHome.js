import React, { Component } from "react";
import './ServicesHome.scss'
import ServicesBanner from "./ServicesBanner";
import ServicesOutstandingDotor from "./ServicesOutstandingDotor";
import ServicesSpecialty from "./ServicesSpecialty";
import { withRouter } from "react-router-dom";

class ServicesHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorList: '',
        }
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="ServicesHome">
                <div className="col-11 Info-content">
                    <ServicesBanner></ServicesBanner>
                    <ServicesSpecialty settings={settings}></ServicesSpecialty>
                    <ServicesOutstandingDotor settings={settings}></ServicesOutstandingDotor>
                </div>
            </div>
        )
    }
}

export default withRouter(ServicesHome)