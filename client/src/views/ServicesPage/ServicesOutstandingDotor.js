import React, { Component } from "react";
import './ServicesOutstandingDotor.scss'
import { Link } from "react-router-dom";
import OriginAvata from "../../assets/images/profile-avatar-origin.jpg"
import Slider from "react-slick";
import { withRouter } from "react-router-dom";
import { handGetServicesInforApi } from "../../services/pageServices"
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class ServicesOutstandingDotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorList: ''
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctor()
    }

    componentDidUpdate = async (prevProps) => {
        let id = this.props.match.params.id
        let prevId = prevProps.match.params.id
        if (id !== prevId) {
            await this.handGetDoctor()
        }
    }

    handGetDoctor = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await handGetServicesInforApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                doctorList: isRes ? res.data.data : {}
            })
        }
    }

    render() {
        let { settings } = this.props
        let { doctorList } = this.state
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="ServicesOutstandingDotor-container">
                <div className="ServicesOutstandingDotor-content">
                    <div className="title-content row col-12">
                        <span className="col-5">{i18next.t("services.title-1")}</span>
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
                                                <p className="title">{item.positionData[value] + " " + item.lastName + " " + item.firstName}</p>
                                                <p className="specialty">
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ServicesOutstandingDotor)))