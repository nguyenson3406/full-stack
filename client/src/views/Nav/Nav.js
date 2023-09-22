import React, { Component } from "react";
import './Nav.scss'
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo/logo.svg'
import { handGetAllcodeApi, handSearchDataApi } from "../../services/pageServices";
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../store/actions/index';

class Nav extends Component {
    state = {
        ServicesList: '',
        searchKey: '',
        searchData: '',
        scroll: true,
        show: false,
    }

    componentDidMount = async () => {
        window.addEventListener("scroll", this.shrinkNav);
        await this.handGetSpecialty()
        await this.handSearchData()
    }

    changeLanguage = (lng) => {
        i18next.changeLanguage(lng)
        this.props.changeLanguage(lng)
    }

    shrinkNav = () => {
        if (document.body.scrollTop >= 80 || document.documentElement.scrollTop >= 80) {
            this.setState({
                scroll: false
            })
        } else {
            this.setState({
                scroll: true
            })
        }
    }

    searchShow = (show) => {
        this.setState({
            show: show
        })
    }

    handGetSpecialty = async () => {
        let res = await handGetAllcodeApi('SERVICES')
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            ServicesList: isRes ? res.data.allcode : {}
        })
    }

    handleOnChange = async (event) => {
        console.log(event.target.value)
        this.setState({
            searchKey: event.target.value
        })
        await this.handSearchData(event.target.value)
    }

    handSearchData = async (key) => {
        let searchKey = key ? key : ''
        let res = await handSearchDataApi(searchKey)
        let data = res && res.data && res.data.errCode === 0 ? res.data.data : {}
        this.setState({
            searchData: data
        })
    }

    render() {
        let { show, ServicesList, searchData, scroll } = this.state
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className={scroll ? "nav-container shrink-nav" : "nav-container"}>
                <div className="nav-content row col-12">
                    <div className="left-content col-2">
                        <Link className="logo-content" to='/'>
                            <span><img src={logo} />TestBooking</span>
                        </Link>
                    </div>
                    <div className="center-content col-5">
                        <div className="services-content">
                            <span className="title">
                                {i18next.t("nav.services")}
                            </span>
                            <div className="dropdown-services">
                                {ServicesList && ServicesList.length > 0 ?
                                    ServicesList.map((item, index) => {
                                        return (
                                            <Link key={index} className="services-link" to={`/services/${item.key_map}`}>
                                                {
                                                    <span>{item[value]}</span>
                                                }
                                            </Link>
                                        )
                                    })
                                    : null}
                            </div>
                        </div>
                        <Link className="clinic-content" to='/clinic'>
                            <span className="title">
                                {i18next.t("nav.clinic")}
                            </span>
                        </Link>
                        <Link className="blog-content" to='/blog'>
                            <span className="title">
                                {i18next.t("nav.blog")}
                            </span>
                        </Link>
                    </div>
                    <div className="right-content col-4">
                        <div className="search-content col-6">
                            <div className="form-group">
                                <label><i className="fas fa-search"></i></label>
                                <input type="text" name="searchKey" className="form-control" placeholder={i18next.t("nav.search")}
                                    value={this.state.searchKey || ''}
                                    onClick={() => this.searchShow(true)}
                                    onBlur={() => this.searchShow(false)}
                                    onChange={(event) => this.handleOnChange(event)}
                                />
                            </div>
                            <div className={show ? "dropdown-search dropdown-show" : "dropdown-search"}>
                                {searchData.doctor && searchData.doctor.length > 0 ?
                                    <div className="doctor-content">
                                        <p> {i18next.t("nav.doctor")}</p>
                                        {searchData.doctor.map((item, index) => {
                                            return (
                                                <Link key={index} className="search-link" to={`/doctor-infor/${item.id}`}>
                                                    {
                                                        <span>{item[value] + " " + item.lastName + " " + item.firstName}</span>
                                                    }
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    : null}
                                {searchData.clinic && searchData.clinic.length > 0 ?
                                    <div className="clinic-content">
                                        <p> {i18next.t("nav.clinic")}</p>
                                        {searchData.clinic.map((item, index) => {
                                            return (
                                                <Link key={index} className="search-link" to={`/clinic/${item.id}`}>
                                                    <span>{item.name}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    : null}
                                {searchData.blog && searchData.blog.length > 0 ?
                                    <div className="blog-content">
                                        <p> {i18next.t("nav.blog")}</p>
                                        {searchData.blog.map((item, index) => {
                                            return (
                                                <Link key={index} className="search-link" to={`/blog/${item.id}`}>
                                                    <span>{item.name}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    : null}
                            </div>
                        </div>
                        <div className="language-content col-4">
                            <i className="fas fa-globe title-language">
                                <span className="title"> {i18next.t("nav.language")} </span>
                                <i className="fas fa-chevron-down down"></i>
                            </i>
                            <div className="dropdown-language">
                                <span className="vi-language"
                                    onClick={() => this.changeLanguage("vi")}>
                                    Tiếng Việt
                                </span>
                                <span className="en-language"
                                    onClick={() => this.changeLanguage("en")}>
                                    English
                                </span>
                            </div>
                        </div>
                        <div className="help-content col-3">
                            <i className="fas fa-question-circle">
                                <span className="title"> {i18next.t("nav.help")}</span>
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
        Language: state.language.Language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (lang) => dispatch(actions.changeLanguage(lang))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Nav))