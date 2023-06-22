import React, { Component } from 'react';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { path } from '../../utils'
import { refreshTokenApi, authLogin } from '../../services/userServices'

class Auth extends Component {
    componentDidMount = async () => {
        let accessToken = this.props.accessToken;
        let res = await authLogin(accessToken);
        if (res) {
            let data = res.data;
            this.props.userLoginSuccess(data.user, accessToken);
        } else {
            accessToken = null;
        }
        if (!accessToken) {
            let res = await refreshTokenApi();
            let data = res.data;
            if (!res) {
                this.props.userLogout();
            } else {
                this.props.userLoginSuccess(data.user, data.accessToken);
            }
        }
    }

    render() {
        let isLoggedIn = this.props.isLoggedIn
        return (
            <>
                {isLoggedIn ?
                    <></>
                    :
                    <Redirect to={path.LOGIN} />
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        accessToken: state.user.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch({ type: 'PROCESS_LOGOUT' }),
        userLoginSuccess: (user, accessToken) => dispatch({ type: 'LOGIN_SUCCESS', payload: { user, accessToken } })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));