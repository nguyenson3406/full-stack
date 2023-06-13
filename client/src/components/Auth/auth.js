import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { path } from '../../utils'

class Auth extends Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn
        return (
            <>{isLoggedIn ?
                <Redirect to={path.SYSTEM} />
                :
                <Redirect to={path.LOGIN} />}</>
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