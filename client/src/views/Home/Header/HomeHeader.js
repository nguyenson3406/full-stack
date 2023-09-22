import React, { Component } from "react";
import './HomeHeader.scss'
import { Link } from "react-router-dom";
import { initImg } from "../../../routes/img"
import { handGetAllcodeApi } from "../../../services/pageServices";
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../../store/actions/index';

class HomeHeadder extends Component {
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
            <div className="Home-header">
                <div className="title-content">
                    <h1>{i18next.t("home.header.line_1")} <br></br>{i18next.t("home.header.line_2")}</h1>
                </div>
                <div className="select-content  col-12">
                    <div className="row col-9">

                        {ServicesList && ServicesList.length > 0 ?
                            ServicesList.map((item, index) => {
                                return (
                                    <div className="col-2" key={index}>
                                        <Link className="select" to={`/services/${item.key_map}`}>
                                            <div className="img-content"><img src={initImg[index]} /></div>
                                            <div className="title-select">
                                                {
                                                    <span>{item[value]}</span>
                                                }
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                            : null}

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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomeHeadder))