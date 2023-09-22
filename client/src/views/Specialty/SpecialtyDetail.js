import React, { Component } from "react";
import './SpecialtyDeatil.scss'
import DoctorDescription from "../DetailDoctor/DoctorDescription";
import Schedule from "../DetailDoctor/Schedule";
import SpecialtyInfo from "./SpecialtyInfo";
import { handGetDoctorApi, handGetAllcodeApi } from "../../services/pageServices";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../store/actions/index';

class SpecialtyDeatil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorList: '',
            maxDoctor: 10,
            Allcode: '',
            provinceId: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctor()
        await this.handGetAllcodeData()
    }

    handGetDoctor = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await handGetDoctorApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                doctorList: isRes ? res.data.doctor : {}
            })
        }
    }

    handGetAllcodeData = async () => {
        let res = await handGetAllcodeApi('PROVINCE');
        let data = res && res.data && res.data.errCode === 0 ? res.data.allcode : {}
        this.setState({
            Allcode: data,
        })
    }

    getMoreDoctor = () => {
        let { maxDoctor } = this.state
        this.setState({
            maxDoctor: maxDoctor + 5
        })
    }

    handleOnChange = (event) => {
        this.setState({
            provinceId: event.target.value
        })
    }

    render() {
        let { doctorList, maxDoctor, Allcode, provinceId } = this.state
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="SpecialtyDeatil">
                <div className="col-11 Info-content">
                    <SpecialtyInfo></SpecialtyInfo>
                </div>
                <div className="controll-list col-11">
                    <div className="location-select col-2">
                        <select name="provinceId" className="form-select"
                            onChange={(event) => this.handleOnChange(event)}
                            value={provinceId || ''}>
                            <option value=''>{i18next.t("specialty.default")}</option>
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
                {doctorList && doctorList.length > 0 ?
                    doctorList.filter((item) =>
                        provinceId ? item.provinceId === provinceId : item
                    ).map((item, index) => {
                        if (maxDoctor >= index) {
                            return (
                                <div className="DetailDoctor col-11 row" key={index}>
                                    <div className="col-6 Description-content"><DoctorDescription id={item.doctorId} isSpecialty={true}></DoctorDescription></div>
                                    <div className="col-6 Schedule-content"><Schedule id={item.doctorId} isSpecialty={true}></Schedule></div>
                                </div>
                            )
                        }
                    })
                    : null}
                {doctorList.length > maxDoctor ?
                    <div className="more-doctor col-1" onClick={() => this.getMoreDoctor()}>
                        <span>{i18next.t("specialty.more")}</span>
                    </div>
                    : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(SpecialtyDeatil)))