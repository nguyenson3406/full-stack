import React, { Component } from "react";
import './Home.scss'
import HomeHeadder from "./Header/HomeHeader";
import Specialty from "./Specialty/Specialty";
import MedicalFacility from "./MedicalFacility/MedicalFacility";
import OutstandingDotor from "./OutstandingDotor/OutstandingDotor";
import Blog from "./Blog/Blog";
import Contact from "./Contact/Contact";

class Home extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="Home-container">
                <div className="Home-content">
                    <HomeHeadder></HomeHeadder>
                    <Specialty settings={settings}></Specialty>
                    <MedicalFacility settings={settings}></MedicalFacility>
                    <OutstandingDotor settings={settings}></OutstandingDotor>
                    <Blog></Blog>
                    <Contact></Contact>
                </div>
            </div>
        )
    }
}

export default Home