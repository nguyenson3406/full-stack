import React, { Component } from "react";
import './Clinic.scss'
import { handGetAllClinicApi, handGetAllcodeApi } from "../../services/pageServices";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/logo/logo.svg';
import Background from '../../assets/images/banner-1.jpg';
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../store/actions/index';

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ClinicList: '',
            Allcode: '',
            provinceId: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetClinic()
        await this.handGetAllcodeData()
    }

    handGetClinic = async () => {
        let res = await handGetAllClinicApi()
        let data = res && res.data && res.data.errCode === 0 ? res.data.data : {}
        this.setState({
            ClinicList: data
        })
    }

    handGetAllcodeData = async () => {
        let res = await handGetAllcodeApi('PROVINCE');
        let data = res && res.data && res.data.errCode === 0 ? res.data.allcode : {}
        this.setState({
            Allcode: data,
        })
    }

    handleOnChange = (event) => {
        this.setState({
            provinceId: event.target.value
        })
    }

    render() {
        let { ClinicList, Allcode, provinceId } = this.state
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="ClinicPage-container">
                <div className="ClinicPage-background col-11" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="background-content">
                        <p>{i18next.t("clinic.title")}</p>
                    </div>
                </div>
                <div className="Clinic-Link col-9 row">
                    <div className="top-link col-12 row">
                        <div className="title-link col-6">
                            <p>{i18next.t("clinic.title")}</p>
                        </div>
                        <div className="controll-list col-6">
                            <div className="location-select col-6">
                                <select name="provinceId" className="form-select"
                                    onChange={(event) => this.handleOnChange(event)}
                                    value={provinceId || ''}>
                                    <option value=''>{i18next.t("clinic.default")}</option>
                                    {Allcode && Allcode.length > 0 ?
                                        Allcode.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key_map}>{item[value]}</option>
                                            )
                                        })
                                        : null}
                                </select>
                            </div>
                        </div>
                    </div>
                    {ClinicList && ClinicList.length > 0 ?
                        ClinicList.filter((item) =>
                            provinceId ? item.provinceId === provinceId : item
                        ).map((item, index) => {
                            return (
                                <div className="Link-content col-3" key={index}>
                                    <Link className="select" to={`/clinic/${item.id}`}>
                                        <div className="img-clinic col-12">
                                            <img src={item.image ? item.image : Logo} />
                                        </div>
                                        <div className="text-content col-12">
                                            <p className="title">{item.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                        : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Clinic))