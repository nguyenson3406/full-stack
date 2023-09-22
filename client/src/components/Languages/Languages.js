import React, { Component } from 'react';
import i18n from './i18vn';
import i18next from 'i18next';
import { connect } from 'react-redux'

class Languages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: ''
        }
    }
    componentDidMount = () => {

        this.changeLanguage()
    }

    changeLanguage = (lng) => {
        i18next.changeLanguage(this.props.Language)
        this.setState({
            language: lng
        })
    }
    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state) => {
    return {
        Language: state.language.Language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Languages);