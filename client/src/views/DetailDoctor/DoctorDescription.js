import React, { Component } from "react";
import './DoctorDescription.scss'
import { handGetDoctorDescriptionApi } from "../../services/pageServices"
import OriginAvata from "../../assets/images/profile-avatar-origin.jpg"
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../store/actions/index';

class DoctorDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DoctorDescription: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctor()
    }

    componentDidUpdate = async (prevProps) => {
        let id = this.props.id
        let prevId = prevProps.id
        if (id !== prevId) {
            await this.handGetDoctor()
        }
    }

    handGetDoctor = async () => {
        if (this.props.id) {
            let id = this.props.id
            let res = await handGetDoctorDescriptionApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                DoctorDescription: isRes ? res.data.data : {},
            })
        }
    }

    render() {
        let { DoctorDescription } = this.state
        let { isSpecialty, id } = this.props
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="DoctorDescription row col-12">
                <div className="img-doctor-content col-2">
                    <div className="img-doctor">
                        <img src={DoctorDescription.image ? DoctorDescription.image : OriginAvata} />
                    </div>
                    {isSpecialty ?
                        <Link className="select" to={`/doctor-infor/${id}`}>
                            <span>{i18next.t("doctorDeltail.more")}</span>
                        </Link>
                        : null}
                </div>
                <div className="doctor-description col-8">
                    <p>{
                        DoctorDescription.positionData && DoctorDescription.positionData[value] &&
                        DoctorDescription.positionData[value] + " " + DoctorDescription.lastName + " " + DoctorDescription.firstName
                    }</p>
                    <div className="description">
                        {DoctorDescription.Markdown && DoctorDescription.Markdown.description &&
                            <span>{DoctorDescription.Markdown.description}</span>
                        }
                    </div>
                    {isSpecialty ?
                        <div className="location">
                            {DoctorDescription.Doctor_Infor && DoctorDescription.Doctor_Infor.provinceData &&
                                <span>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{
                                        DoctorDescription.Doctor_Infor.provinceData[value]
                                    }</span>
                                </span>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DoctorDescription))