import React, { Component } from "react";
import './BookingDescription.scss'
import { handGetDoctorDescriptionApi } from "../../services/pageServices"
import OriginAvata from "../../assets/images/profile-avatar-origin.jpg"
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../store/actions/index';

class DoctorDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DoctorDescription: '',
            timeData: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctor()
    }

    handGetDoctor = async () => {
        if (this.props.id) {
            let id = this.props.id
            let res = await handGetDoctorDescriptionApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            let data = res.data.data
            this.setState({
                timeData: this.props.timeData,
                DoctorDescription: isRes ? data : {}
            })
            let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
            let doctorName = data.positionData[value] + " " + data.lastName + " " + data.firstName
            this.props.doctorName(doctorName)
        }
    }

    render() {
        let { DoctorDescription, timeData } = this.state
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="content row col-12">
                <div className="img-doctor col-2">
                    <img src={DoctorDescription.image ? DoctorDescription.image : OriginAvata} />
                </div>
                <div className="doctor-description col-8">
                    <p>{
                        DoctorDescription.positionData && DoctorDescription.positionData[value] &&
                        DoctorDescription.positionData[value] + " " + DoctorDescription.lastName + " " + DoctorDescription.firstName
                    }</p>
                    <div className="description">
                        <span>{timeData}</span>
                    </div>
                </div>
                <div className="price">
                    <p className="title">{i18next.t("booking.price-1")}
                        <span> {
                            DoctorDescription.Doctor_Infor && DoctorDescription.Doctor_Infor.priceData &&
                            DoctorDescription.Doctor_Infor.priceData[value]
                        }{i18next.t("booking.price-2")}
                        </span>
                    </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DoctorDescription))