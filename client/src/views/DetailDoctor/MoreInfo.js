import React, { Component } from "react";
import './MoreInfo.scss'
import { handGetDoctorInforApi } from "../../services/pageServices"
import Collapse from 'react-bootstrap/Collapse';
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../store/actions/index';

class MoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            doctorInfor: '',
            show: false,
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctorInfor()
    }

    componentDidUpdate = async (prevProps) => {
        let id = this.props.id
        let prevId = prevProps.id
        if (id !== prevId) {
            await this.handGetDoctorInfor()
        }
    }

    handGetDoctorInfor = async () => {
        if (this.props.id) {
            let id = this.props.id
            let res = await handGetDoctorInforApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                doctorInfor: isRes ? res.data.doctorInfor : {}
            })
        }
    }

    handShow = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        let { show, doctorInfor, } = this.state
        let { isSpecialty } = this.props
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className={isSpecialty ? "more-info col-12"
                : "more-info col-5"}>
                <div className="address">
                    <p className="title">{i18next.t("doctorDeltail.moreInfo.address")}</p>
                    <div className="content">
                        <p>{doctorInfor && doctorInfor.clinicData &&
                            doctorInfor.clinicData.name}
                        </p>
                        <span>
                            {doctorInfor && doctorInfor.clinicData &&
                                doctorInfor.clinicData.address}
                        </span>
                    </div>
                </div>
                <div className="price">
                    <p className="title">{i18next.t("doctorDeltail.moreInfo.price-1")}
                        {!show ?
                            <span>
                                <span>{doctorInfor && doctorInfor.priceData &&
                                    doctorInfor.priceData[value]} {i18next.t("doctorDeltail.moreInfo.price-2")}
                                </span>
                                <span className="controll-show"
                                    onClick={() => this.handShow()}>{i18next.t("doctorDeltail.moreInfo.controll-show-1")}</span>
                            </span>
                            : null
                        }
                    </p>
                    <Collapse in={show}>
                        <div className="content">
                            <table className="col-12">
                                <tbody>
                                    <tr>
                                        <td>{i18next.t("doctorDeltail.moreInfo.price-3")}</td>
                                        <td className="price-value">
                                            {doctorInfor && doctorInfor.priceData &&
                                                doctorInfor.priceData[value]} {i18next.t("doctorDeltail.moreInfo.price-4")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <small>
                                                {doctorInfor && doctorInfor.note &&
                                                    doctorInfor.note
                                                }
                                            </small>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={2}>{i18next.t("doctorDeltail.moreInfo.payment")}
                                            <span> {doctorInfor && doctorInfor.paymentData &&
                                                doctorInfor.paymentData[value]}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <span className="controll-show"
                                onClick={() => this.handShow()}>{i18next.t("doctorDeltail.moreInfo.controll-show-2")}</span>
                        </div>
                    </Collapse>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(MoreInfo))