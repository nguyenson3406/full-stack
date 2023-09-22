import React, { Component } from "react";
import './OutstandingDotor.scss'
import { Link } from "react-router-dom";
import OriginAvata from "../../../assets/images/profile-avatar-origin.jpg"
import Slider from "react-slick";
import { handGetDoctorApi } from "../../../services/pageServices"
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../../store/actions/index';

class OutstandingDotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorList: ''
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctor()
    }

    handGetDoctor = async () => {
        let res = await handGetDoctorApi()
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            doctorList: isRes ? res.data.doctor : {}
        })
    }

    render() {
        let { settings } = this.props
        let { doctorList } = this.state
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="OutstandingDotor-container">
                <div className="OutstandingDotor-content">
                    <div className="title-content row col-12">
                        <span className="col-5">{i18next.t("home.outstandingDotor")}</span>
                    </div>
                    <div className="slide-content">
                        <Slider className="col-12" {...settings}>
                            {doctorList && doctorList.length > 0 ?
                                doctorList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Link className="select" to={`/doctor-infor/${item.id}`}>
                                                <div className="img-doctor">
                                                    <img src={item.image ? item.image : OriginAvata} />
                                                </div>
                                                <p className="title">
                                                    {
                                                        item.positionData[value] + " " + item.lastName + " " + item.firstName
                                                    }
                                                </p>
                                                <p className="description">
                                                    {item.Doctor_Infor.specialtyData.name}
                                                </p>
                                            </Link>
                                        </div>
                                    )
                                })
                                : null
                            }
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OutstandingDotor))