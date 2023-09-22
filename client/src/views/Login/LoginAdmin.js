import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import * as actions from '../../store/actions/index';
import './Login.scss'
import { handLoginApi } from '../../services/userServices'
import { connect } from 'react-redux';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class LoginAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPass: false
        }
    }

    componentDidMount = () => {
        let isLoggedIn = this.props.dataRedux.isLoggedIn
        if (isLoggedIn) {
            this.props.history.push('/admin');
        }
    }

    handOnChangeUser = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handOnChangePass = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handOnKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handLogin()
        }
    }

    handLogin = async () => {
        let { username, password } = this.state
        if (!username || !password) {
            toast.error(`Mising Username or Password`, {
                className: 'toast-message'
            })
        } else {
            try {
                let res = await handLoginApi(username, password);
                let data = res.data;
                if (res && res.status !== 200) {
                    this.props.history.push('/404');
                }
                if (data.errCode !== 0) {
                    throw new Error(data.message);
                } else {
                    this.props.userLoginSuccess(data.user, data.accessToken);
                    this.props.history.push('/admin');
                }

            } catch (e) {
                toast.error(e.message, {
                    className: 'toast-message'
                })
            }
        }
    }

    handShowPass = () => {
        let showPass = this.state.showPass
        this.setState({
            showPass: !showPass
        })
    }

    render() {
        let { username, password, showPass } = this.state
        return (
            <div className="login-background">
                <div className="login-container col-9 col-md-5  col-lg-3">
                    <div className="login-content">
                        <div className="title col-12 text-center">{i18next.t("login.title-1")}</div>
                        <div className="col-12 form-group">
                            <label className="mb-2">{i18next.t("login.label-1")}</label>
                            <input type="text" className="form-control" placeholder={i18next.t("login.placeholder-1")}
                                value={username}
                                onKeyDown={(event) => this.handOnKeyDown(event)}
                                onChange={(event) => this.handOnChangeUser(event)}
                            />
                        </div>
                        <div className="col-12 form-group input-pass">
                            <label className="mb-2">{i18next.t("login.label-2")}</label>
                            <input type={showPass === false ? "password" : "text"}
                                className="form-control" placeholder={i18next.t("login.label-2")}
                                value={password}
                                onKeyDown={(event) => this.handOnKeyDown(event)}
                                onChange={(event) => this.handOnChangePass(event)}
                            />
                            <div className="showPass" onClick={() => this.handShowPass()}>
                                {showPass === false ?
                                    <i className="far fa-eye-slash"></i>
                                    :
                                    <i className="fas fa-eye"></i>
                                }
                            </div>
                        </div>
                        <a className="forgot-password mt-1" href="#">{i18next.t("login.forgot")}</a>
                        <button className="col-12 mt-3 btn-sumit"
                            onClick={() => this.handLogin()}
                        >{i18next.t("login.sumit")}</button>
                        <div className="col-12 mt-3 social-login">
                            <p>{i18next.t("login.title-2")}</p>
                            <div className="icon">
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
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
        dataRedux: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (user, accessToken) => dispatch(actions.Login(user, accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(LoginAdmin)))