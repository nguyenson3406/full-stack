import React, { Component } from "react";
import './ClinicDetail.scss';
import { withRouter } from "react-router-dom";
import DoctorDescription from "../DetailDoctor/DoctorDescription";
import Schedule from "../DetailDoctor/Schedule";
import ClinicInfo from "./ClinicInfo";
import { handGetDoctorClinicApi } from "../../services/pageServices";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class ClinicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorList: '',
            maxDoctor: 2,
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctor()
    }

    handGetDoctor = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await handGetDoctorClinicApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                doctorList: isRes ? res.data.data : {}
            })
        }
    }

    getMoreDoctor = () => {
        let { maxDoctor } = this.state
        this.setState({
            maxDoctor: maxDoctor + 5
        })
    }

    render() {
        let { doctorList, maxDoctor } = this.state
        return (
            <div className="ClinicDetail">
                <div className="col-11 Info-content">
                    <ClinicInfo></ClinicInfo>
                </div>
                <div className="Schedule-content">
                    <p className="col-11 title-schedule">{i18next.t("clinicDetail.schedule")}</p>
                    {doctorList && doctorList.length > 0 ?
                        doctorList.map((item, index) => {
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
                            <span>{i18next.t("clinicDetail.more")}</span>
                        </div>
                        : null}
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ClinicDetail))