import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import './Login.scss'
import { handLoginApi } from '../../services/userServices'
import { connect } from 'react-redux';

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
                        <div className="title col-12 text-center">Login</div>
                        <div className="col-12 form-group">
                            <label className="mb-2">Username:</label>
                            <input type="text" className="form-control" placeholder="Enter your username"
                                value={username}
                                onKeyDown={(event) => this.handOnKeyDown(event)}
                                onChange={(event) => this.handOnChangeUser(event)}
                            />
                        </div>
                        <div className="col-12 form-group input-pass">
                            <label className="mb-2">Password:</label>
                            <input type={showPass === false ? "password" : "text"}
                                className="form-control" placeholder="Enter your password"
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
                        <a className="fogot-password mt-1" href="#">Fogot your password?</a>
                        <button className="col-12 mt-3 btn-sumit"
                            onClick={() => this.handLogin()}
                        >Login</button>
                        <div className="col-12 mt-3 social-login">
                            <p>Or sign in with:</p>
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
        userLoginSuccess: (user, accessToken) => dispatch({ type: 'LOGIN_SUCCESS', payload: { user, accessToken } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginAdmin))