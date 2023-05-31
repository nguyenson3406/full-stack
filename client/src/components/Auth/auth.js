import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

class Auth extends Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn
        return (
            <>{isLoggedIn ?
                <Redirect to="/admin" />
                :
                <Redirect to="/login-admin" />}</>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);