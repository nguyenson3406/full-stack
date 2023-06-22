import React, { Component } from "react";
import './NavSystem.scss'
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo/logo.svg'
import { handLogoutApi } from "../../services/userServices"
import { connect } from 'react-redux';

class NavSystem extends Component {
    handLogout = async () => {
        let res = await handLogoutApi()
        if (res.status === 200) {
            this.props.userLogout()
        }
    }
    render() {
        return (
            <div className="nav-container">
                <div className="nav-content row col-12">
                    <div className="left-content col-2">
                        <Link className="logo-content" to='/admin'>
                            <span><img src={logo} />TestBooking</span>
                        </Link>
                    </div>
                    <div className="center-content col-5">

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
                        <div className="logout-content col-3"
                            onClick={() => this.handLogout()}>
                            <i className="fas fa-sign-out-alt">
                                <span className="title"> Dang xuat</span>
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch({ type: 'PROCESS_LOGOUT' })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavSystem)