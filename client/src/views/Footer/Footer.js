import React, { Component } from "react";
import './Footer.scss'
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/logo/logo.svg'

class Footer extends Component {

    render() {
        return (
            <div className="footer-container">
                <div className="footer-main row col-12">
                    <div className="left-content col-3">
                        <NavLink className="logo-content" to='/'>
                            <span><img src={logo} />TestBooking</span>
                        </NavLink>
                        <div className="info-web">
                            <p>TestBooking san pham duoc tao len voi y tuong dung cho viec dat lich hen y te</p>
                        </div>
                        <div className="footer-social">
                            <NavLink className="social-link" to='#'>
                                <i className="fab fa-facebook-f"></i>
                            </NavLink>
                            <NavLink className="social-link" to='#'>
                                <i className="fab fa-twitter"></i>
                            </NavLink>
                            <NavLink className="social-link" to='#'>
                                <i className="fab fa-youtube"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="center-content col-3">
                        <div className="title-content">
                            <p>Dich vu noi bat</p>
                        </div>
                        <div className="link-content">
                            <div className="link">
                                <NavLink to='/todo'>
                                    <span className="title">
                                        <i className="fas fa-chevron-right"> </i>
                                        Dich vu kham
                                    </span>
                                </NavLink>
                                <NavLink to='/user'>
                                    <span className="title">
                                        <i className="fas fa-chevron-right"> </i>
                                        Co so y te
                                    </span>
                                </NavLink>
                            </div>
                            <div className="link">
                                <NavLink className="link" to='/todo'>
                                    <span className="title">
                                        <i className="fas fa-chevron-right"> </i>
                                        Bac si
                                    </span>
                                </NavLink>
                                <NavLink className="link" to='/about'>
                                    <span className="title">
                                        <i className="fas fa-chevron-right"> </i>
                                        Cam nang
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="right-content col-3">
                        <div className="title-content">
                            <p>Thong tin lien he</p>
                        </div>
                        <div className="body-content">
                            <p><i className="fas fa-envelope"></i>support@testbooking.com</p>
                            <p><i className="fas fa-phone"></i>1-800-123-4560</p>
                            <p><i className="fas fa-map-marker-alt"></i>Số 01, TestBooking, Phường 15, Quận 10, TestBooking</p>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Copyright © 2023 TestBooking</p>
                </div>
            </div>
        )
    }
}

export default Footer