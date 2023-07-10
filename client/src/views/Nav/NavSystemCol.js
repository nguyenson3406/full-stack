import React, { Component } from "react";
import './NavSystemCol.scss'
import { NavLink, withRouter } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';

class NavSystemCol extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navId: 0
        };
    }

    componentDidMount = () => {
        let path = this.props.history.location.pathname
        this.checkPath(path)
    }

    componentDidUpdate = (prevProps) => {
        let path = this.props.history.location.pathname
        let prevPath = prevProps.location.pathname
        if (path !== prevPath) {
            this.checkPath(path)
        }
    }

    checkPath = (path) => {
        if (path.indexOf('/admin/catalog') !== -1) {
            this.setState({
                navId: 1
            })
        } else if (path.indexOf('/admin/infor') !== -1) {
            this.setState({
                navId: 2
            })
        } else if (path.indexOf('/admin/user') !== -1) {
            this.setState({
                navId: 3
            })
        } else {
            this.setState({
                navId: 0
            })
        }
    }

    setOpen = (Id) => {
        let navID = this.state.navId
        if (navID === Id) {
            Id = 0
        }
        this.setState({
            navId: Id
        })
    }
    render() {
        let navId = this.state.navId
        return (
            <div className="side-nav-content">
                <div className="home-content">
                    <NavLink exact to='/admin' activeClassName="selected" onClick={() => this.setOpen(0)}>
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </NavLink>
                </div>
                <div className="catalog-management-content">
                    <span className={navId === 1 ? "title selected" : "title"} onClick={() => this.setOpen(1)}>
                        <i className="fas fa-clipboard-list"></i>
                        <span>Quan ly danh muc <i className={navId === 1 ? "fas fa-chevron-down" : "fas fa-chevron-right"}></i></span>
                    </span>
                    <Collapse in={navId === 1 ? true : false}>
                        <div id="catalog-text">
                            <div className="doctor-content">
                                <NavLink to='/admin/catalog/doctor' activeClassName="selected">
                                    <span className="title" >
                                        <i className="fas fa-chevron-right"></i>
                                        <span>Danh sach bac si</span>
                                    </span>
                                </NavLink>
                            </div>
                            <div className="specialty-content">
                                <NavLink to='/admin/catalog/specialty' activeClassName="selected">
                                    <span className="title">
                                        <i className="fas fa-chevron-right"></i>
                                        <span>Chuyen khoa</span>
                                    </span>
                                </NavLink>
                            </div>
                            <div className="clinic-content">
                                <NavLink to='/admin/catalog/clinic' activeClassName="selected">
                                    <span className="title">
                                        <i className="fas fa-chevron-right"></i>
                                        <span>Co so y te</span>
                                    </span>
                                </NavLink>
                            </div>
                            <div className="blog-content">
                                <NavLink to='/admin/catalog/blog' activeClassName="selected">
                                    <span className="title">
                                        <i className="fas fa-chevron-right"></i>
                                        <span>Bai viet</span>
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div className="infor-management-content">
                    <span className={navId === 2 ? "title selected" : "title"} onClick={() => this.setOpen(2)}>
                        <i className="fas fa-calendar"></i>
                        <span>Quan tri thong tin <i className={navId === 2 ? "fas fa-chevron-down" : "fas fa-chevron-right"}></i></span>
                    </span>
                    <Collapse in={navId === 2 ? true : false}>
                        <div id="infor-text">
                            <div className="schedule-content">
                                <NavLink to='/admin/infor/schedule' activeClassName="selected">
                                    <span className="title" >
                                        <i className="fas fa-chevron-right"></i>
                                        <span>Lich trinh bac si</span>
                                    </span>
                                </NavLink>
                            </div>
                            <div className="booking-content">
                                <NavLink to='/admin/infor/booking' activeClassName="selected">
                                    <span className="title">
                                        <i className="fas fa-chevron-right"></i>
                                        <span>Lich hen</span>
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div className="user-management-content">
                    <span className={navId === 3 ? "title selected" : "title"} onClick={() => this.setOpen(3)}>
                        <i className="fas fa-users"></i>
                        <span>Tai khoan <i className={navId === 3 ? "fas fa-chevron-down" : "fas fa-chevron-right"}></i></span>
                    </span>
                    <Collapse in={navId === 3 ? true : false}>
                        <div id="user-text">
                            <div className="user-list-content">
                                <NavLink to='/admin/user/list' activeClassName="selected">
                                    <span className="title" >
                                        <i className="fas fa-chevron-right"></i>
                                        <span>Danh sach tai khoan</span>
                                    </span>
                                </NavLink>
                            </div>
                            <div className="profile-content">
                                <NavLink to='/admin/user/profile' activeClassName="selected">
                                    <span className="title">
                                        <i className="fas fa-chevron-right"></i>
                                        <span>Ho so</span>
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        )
    }
}

export default withRouter(NavSystemCol)