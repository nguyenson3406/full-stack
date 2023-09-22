import React, { Component } from "react";
import './Footer.scss'
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/logo/logo.svg'
import { handGetAllcodeApi } from "../../services/pageServices";
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../store/actions/index';

class Footer extends Component {
    state = {
        ServicesList: '',
    }

    componentDidMount = async () => {
        await this.handGetSpecialty()
    }

    handGetSpecialty = async () => {
        let res = await handGetAllcodeApi('SERVICES')
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            ServicesList: isRes ? res.data.allcode : {}
        })
    }
    render() {
        let { ServicesList } = this.state
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="footer-container">
                <div className="footer-main row col-12">
                    <div className="left-content col-3">
                        <NavLink className="logo-content" to='/'>
                            <span><img src={logo} />TestBooking</span>
                        </NavLink>
                        <div className="info-web">
                            <p>{i18next.t("footer.info")}</p>
                        </div>
                        <div className="footer-social">
                            <NavLink className="social-link" to='#'>
                                <i className="fab fa-facebook-f"></i>
                            </NavLink>
                            <NavLink className="social-link" to='#'>
                                <i className="fab fa-twitter"></i>
                            </NavLink>
                            <NavLink className="social-link" to='#'>
                                <i className="fab fa-youtube"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="center-content col-3">
                        <div className="title-content">
                            <p>{i18next.t("footer.title-1")}</p>
                        </div>
                        <div className="link-content">
                            {ServicesList && ServicesList.length > 0 ?
                                ServicesList.map((item, index) => {
                                    return (
                                        <div className="link" key={index}>
                                            <Link className="select" to={`/services/${item.key_map}`}>
                                                <span className="title">
                                                    <i className="fas fa-chevron-right"> </i>
                                                    <span>{item[value]}</span>
                                                </span>
                                            </Link>
                                        </div>
                                    )
                                })
                                : null}
                        </div>
                    </div>
                    <div className="right-content col-3">
                        <div className="title-content">
                            <p>{i18next.t("footer.title-2")}</p>
                        </div>
                        <div className="body-content">
                            <p><i className="fas fa-envelope"></i>{i18next.t("footer.email")}</p>
                            <p><i className="fas fa-phone"></i>{i18next.t("footer.phonenumber")}</p>
                            <p><i className="fas fa-map-marker-alt"></i>{i18next.t("footer.address")}</p>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>{i18next.t("footer.title-3")}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Language: state.language.Language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (lang) => dispatch(actions.changeLanguage(lang))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Footer))