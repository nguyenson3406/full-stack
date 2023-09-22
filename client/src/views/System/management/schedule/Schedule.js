import React, { Component } from "react";
import { handGetScheduleApi, handAddScheduleApi } from "../../../../services/inforManagementServices"
import { handGetAllcodeApi } from "../../../../services/pageServices"
import './Schedule.scss'
import { toast } from "react-toastify";
import moment from 'moment/dist/moment';
import SelectManagement from "../SelectManagement";

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: '',
            listSchedule: '',
            Allcode: '',
            timeSelect: '',
            doctorId: '',
        }
    }

    componentDidMount = async () => {
        let date = moment().add(1, 'days').format('YYYY-MM-DD')
        await this.handGetAllcodeData()
        this.setState({
            currentDate: date
        })
    }

    handGetScheduleData = async (doctorId) => {
        let res = await handGetScheduleApi(doctorId);
        let data = res && res.data && res.data.errCode === 0 ? res.data.doctor : {}
        this.getTimeSelect('', data)
        this.setState({
            listSchedule: data && data > 0 ? data : '',
            doctorId: doctorId,
        })
    }

    handGetAllcodeData = async () => {
        let res = await handGetAllcodeApi('TIME');
        let data = res && res.data && res.data.errCode === 0 ? res.data.allcode : {}
        data.map((item, index) => {
            data[index].isSelect = ''
        })
        this.setState({
            Allcode: data,
        })
    }

    handOnChange = (date) => {
        this.getTimeSelect(date)
        this.setState({
            currentDate: date
        })
    }

    getTimeSelect = (dateSelect, listSchedule) => {
        let list = listSchedule ? listSchedule : this.state.listSchedule
        let copyAllcode = this.state.Allcode
        let date = dateSelect ? dateSelect : this.state.currentDate
        copyAllcode.map((item, index) => {
            copyAllcode[index].isSelect = ''
        })
        if (list && list.length > 0) {
            list.map((item, index) => {
                if (item.date.includes(date)) {
                    copyAllcode.forEach((value, key) => {
                        if (value.key_map.includes(item.timeType)) {
                            copyAllcode[key].isSelect = index
                        }
                    })
                }
            })
        }
        this.setState({
            Allcode: copyAllcode
        })
    }

    handScheduleList = (timeType, indexList) => {
        let list = this.state.listSchedule
        let data = {
            timeType: timeType,
            date: this.state.currentDate,
            doctorId: this.state.doctorId,
        }
        if (!this.validateSchedule(data)) {
            return (toast.error(`Mising parameter`, {
                className: 'toast-message'
            }))
        }
        if (indexList || indexList === 0) {
            list = list.filter((item, index) => index !== indexList)
            this.setState({
                listSchedule: list
            })
        } else {
            list = [...list, data]
            this.setState({
                listSchedule: list
            })
        }
        this.getTimeSelect('', list)
    }

    handAddSchedule = async () => {
        try {
            let data = this.state.listSchedule
            if (!(data && data.length > 0)) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
            let res = await handAddScheduleApi(data)
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetDoctorData(data.doctorId);
                toast.success(`Save success`, {
                    className: 'toast-message'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    validateSchedule = (data) => {
        let arrInput = ['timeType', 'date', 'doctorId']
        for (var i = 0; i < arrInput.length; i++) {
            if (!data[arrInput[i]]) {
                return false
            }
        }
        return true
    }

    render() {
        let { Allcode } = this.state
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="List-content col-11">
                        <p className="title">Schedule List</p>
                        <div className="Schedule-select row col-12">
                            <SelectManagement getId={(event) => this.handGetScheduleData(event)}
                                getDate={(event) => this.handOnChange(event)} isBooking={false}
                            ></SelectManagement>

                            <div className="Schedule-time form-group row col-12">
                                {
                                    Allcode && Allcode.length > 0 ?
                                        Allcode.map((item, index) => {
                                            return (
                                                <div className="form-group col-md-3" key={index}>
                                                    <div className={item.isSelect || item.isSelect === 0 ? "select-time select" : "select-time"}
                                                        onClick={() => this.handScheduleList(item.key_map, item.isSelect)}>
                                                        <span>{item.value_en}</span>
                                                    </div>
                                                </div>)
                                        })
                                        :
                                        null
                                }
                            </div>
                            <div className="btn-controll">
                                <button className="btn btn-primary" onClick={() => this.handAddSchedule()}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Schedule