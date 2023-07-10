import React, { Component } from "react";
import './NavSystem.scss'
import { Link, withRouter } from "react-router-dom";
import logo from '../../assets/images/logo/logo.svg'
import OriginAvata from '../../assets/images/profile-avatar-origin.jpg'
import { handLogoutApi } from "../../services/userServices"
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class NavSystem extends Component {
    handLogout = async () => {
        let res = await handLogoutApi()
        if (res.status === 200) {
            this.props.userLogout()
        }
    }
    render() {
        let dataUser = this.props.dataUser
        return (
            <div className="nav-system-container">
                <div className="nav-content row col-12">
                    <div className="left-content col-2">
                        <Link className="logo-content" to='/admin'>
                            <span><img src={logo} />Administrator</span>
                        </Link>
                    </div>
                    <div className="right-content col-5">
                        <div className="language-content col-3">
                            <i className="fas fa-globe title-language">
                                <span className="title"> Tieng Viet </span>
                                <i className="fas fa-chevron-down down"></i>
                            </i>
                            <div className="dropdown-language">
                                <span className="vi-language active">Tieng Viet</span>
                                <span className="en-language">English</span>
                            </div>
                        </div>
                        <div className="user-content col-4">
                            <div className="user-name col-12 row">
                                <div className="avatar col-3">
                                    <img src={dataUser && dataUser.image ? dataUser.image : OriginAvata} />
                                </div>
                                <div className="name col-8">
                                    <span>{dataUser ? dataUser.firstName : ''}</span>
                                </div>
                            </div>
                            <div className="dropdown-user">
                                <div className="title-dropdown">
                                    <p>Welcome Admin!</p>
                                    {dataUser ? dataUser.firstName : ''}
                                </div>
                                <div className="content-dropdown">
                                    <span className="profile">
                                        <i className="fas fa-user user"></i> Trang ca nhan</span>
                                    <span className="logout"
                                        onClick={() => this.handLogout()}>
                                        <span className="title">
                                            <i className="fas fa-sign-out-alt"></i> Dang xuat
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataUser: state.user.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch(actions.Logout())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavSystem))