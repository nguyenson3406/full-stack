import React, { Component } from "react";
import './Nav.scss'
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/logo/logo.svg'

class Nav extends Component {
    state = {
        show: true
    }

    componentDidMount() {
        window.addEventListener("scroll", this.shrinkNav);
    }

    shrinkNav = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            this.setState({
                show: false
            })
        } else {
            this.setState({
                show: true
            })
        }
    }

    render() {
        let { show } = this.state
        return (
            <div className={show ? "nav-container shrink-nav" : "nav-container"}>
                <div className="nav-content row col-12">
                    <div className="left-content col-2">
                        <NavLink className="logo-content" to='/'>
                            <span><img src={logo} />TestBooking</span>
                        </NavLink>
                    </div>
                    <div className="center-content col-5">
                        <NavLink className="services-content" to='/todo'>
                            <span className="title">
                                Dich vu kham
                            </span>
                        </NavLink>
                        <NavLink className="department-content" to='/user'>
                            <span className="title">
                                Co so y te
                            </span>
                        </NavLink>
                        <NavLink className="doctor-content" to='/todo'>
                            <span className="title">
                                Bac si
                            </span>
                        </NavLink>
                        <NavLink className="blog-content" to='/about'>
                            <span className="title">
                                Cam nang
                            </span>
                        </NavLink>
                    </div>
                    <div className="right-content col-4">
                        <div className="search-content col-6">
                            <div className="form-group">
                                <label><i className="fas fa-search"></i></label>
                                <input type="text" className="form-control" placeholder="Tim kiem" />
                            </div>
                        </div>
                        <div className="language-content col-4">
                            <i className="fas fa-globe title-language">
                                <span className="title"> Tieng Viet </span>
                                <i className="fas fa-chevron-down down"></i>
                            </i>
                            <div className="dropdown-language">
                                <span className="vi-language active">Tieng Viet</span>
                                <span className="en-language">English</span>
                            </div>
                        </div>
                        <div className="help-content col-3">
                            <i className="fas fa-question-circle">
                                <span className="title"> Ho tro</span>
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav