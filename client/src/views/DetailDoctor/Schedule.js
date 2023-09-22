import React, { Component } from "react";
import './Schedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi';
import { handGetScheduleApi } from "../../services/pageServices"
import Booking from "../Booking/Booking";
import MoreInfo from "./MoreInfo";
import { emitter } from "../../utils/emitter";
import { connect } from 'react-redux'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import * as actions from '../../store/actions/index';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Schedule: '',
            date: '',
            dateSelect: '',
            toggle: false,
        }
    }

    componentDidMount = async () => {
        await this.getDateSelect()
    }

    componentDidUpdate = async (prevProps) => {
        let id = this.props.id
        let prevId = prevProps.id
        let lang = this.props.Language
        let prevLang = prevProps.Language
        if (id !== prevId || lang !== prevLang) {
            await this.getDateSelect()
        }
    }

    handGetSchedule = async (date) => {
        if (this.props.id) {
            let id = this.props.id
            let res = await handGetScheduleApi(id, date)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                Schedule: isRes ? res.data.schedule : {}
            })
        }
    }

    getDateSelect = async () => {
        let dateSelect = []
        let newdate = {}
        let Language = this.props.Language
        let today = Language.includes("en") ? "Today " : "Hôm nay "
        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                newdate = {
                    label: today + moment().format('DD/MM'),
                    value: moment().format('YYYY-MM-DD')
                }
            } else if (Language.includes("en")) {
                moment.locale('en')
                newdate = {
                    label: moment().add(i, 'days').format('ddd DD/MM'),
                    value: moment().add(i, 'days').format('YYYY-MM-DD')
                }
            } else {
                moment.locale('vi')
                let label = moment().add(i, 'days').format('dddd DD/MM')
                newdate = {
                    label: label[0].toUpperCase() + label.slice(1),
                    value: moment().add(i, 'days').format('YYYY-MM-DD')
                }
            }
            dateSelect.push(newdate)
        }
        this.setState({
            date: dateSelect,
            dateSelect: dateSelect[0].value
        })
        await this.handGetSchedule(dateSelect[0].value)
    }

    handOnChange = async (event) => {
        await this.handGetSchedule(event.target.value)
        this.setState({
            dateSelect: event.target.value
        })
    }

    handToggle = (timeType, timeData, id) => {
        let data = {
            timeType: timeType,
            id: this.props.id,
            date: this.state.dateSelect,
            timeData: timeData + " - " + moment(this.props.date).format('ddd - DD/MM/YYYY'),
            scheduleId: id,
        }
        emitter.emit('BOOKING_RESET_DATA', data)
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        let { Schedule, date, toggle } = this.state
        let { isSpecialty, Language } = this.props
        let value = Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="doctor-schedule col-12">
                <Booking toggle={toggle} handToggle={() => this.handToggle()}></Booking>
                <div className={isSpecialty ? "date-select col-4"
                    : "date-select col-2"}>
                    <select name="time"
                        className={Language.includes("en") ? "form-select en" : "form-select vi"}
                        onChange={(event) => this.handOnChange(event)}>
                        {date && date.length > 0 ?
                            date.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })
                            : null
                        }
                    </select>
                </div>
                <div className="schedule-content col-12 row">
                    <p><i className="fas fa-calendar-alt"></i><span>{i18next.t("doctorDeltail.schedule.calendar")}</span></p>
                    <div className={isSpecialty ? "schedule-time col-12 row"
                        : "schedule-time col-7 row"}>
                        {Schedule && Schedule.length > 0 ?
                            Schedule.map((item, index) => {
                                if (!item.currentNumber || item.currentNumber <= item.maxNumber) {
                                    return (
                                        <div key={index} className="select-time"
                                            onClick={() => this.handToggle(item.timeType, item.timeData[value], item.id)}>
                                            <span>{item.timeData[value]}</span>
                                        </div>
                                    )
                                }
                            })
                            : <div><span>{i18next.t("doctorDeltail.schedule.time")}</span></div>
                        }
                    </div>
                    <MoreInfo id={this.props.id} isSpecialty={isSpecialty}></MoreInfo>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Schedule))