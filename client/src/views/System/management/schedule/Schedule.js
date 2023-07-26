import React, { Component } from "react";
import Select from 'react-select'
import { handGetDoctorApi, handAddScheduleApi } from "../../../../services/inforManagementServices"
import { handGetAllcodeApi } from "../../../../services/pageServices"
import './Schedule.scss'
import { toast } from "react-toastify";

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: '',
            minDate: '',
            currentDate: '',
            doctorId: '',
            listSchedule: '',
            Allcode: '',
            timeSelect: '',
        }
    }

    componentDidMount = async () => {
        this.getDate()
        await this.handGetDoctorData()
        await this.handGetAllcodeData()
    }

    handGetDoctorData = async (doctorId) => {
        let res = await handGetDoctorApi(doctorId);
        let data = res && res.data && res.data.errCode === 0 ? res.data.doctor : {}
        let copyList = []
        if (!doctorId) {
            if (data && data.length > 0) {
                data.map((item, index) => {
                    let position = item.positionData.value_en ? item.positionData.value_en : ''
                    copyList[index] = {
                        value: item.id,
                        label: position + " " + item.lastName + " " + item.firstName
                    }
                })
            }
            this.setState({
                listDoctor: copyList,
            })
        } else {
            this.getTimeSelect('', data)
            this.setState({
                listSchedule: data && data > 0 ? data : '',
            })
        }
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

    getDate = () => {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        let newdate = "" + date.getFullYear()
        newdate = date.getMonth() <= 8 ? newdate + "-0" + (date.getMonth() + 1) : newdate + "-" + (date.getMonth() + 1)
        newdate = date.getDate() < 10 ? newdate + "-0" + date.getDate() : newdate + "-" + date.getDate()
        this.setState({
            minDate: newdate,
            currentDate: newdate,
        })
    }

    handOnChange = (event) => {
        this.getTimeSelect(event.target.value)
        this.setState({
            currentDate: event.target.value
        })
    }

    handOnChangeDoctorId = async (doctorId) => {
        await this.handGetDoctorData(doctorId.value)
        this.setState({
            doctorId: doctorId.value
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
                        if (value.key.includes(item.timeType)) {
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
        console.log(this.state.Allcode)
        console.log(this.state)
        let { Allcode } = this.state
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="List-content col-11">
                        <p className="title">Schedule List</p>
                        <div className="Schedule-select row col-12">
                            <div className="form-group col-md-5">
                                <label className="col-12">Doctor:</label>
                                <Select className="Doctor-list" options={this.state.listDoctor}
                                    onChange={this.handOnChangeDoctorId}
                                />
                            </div>
                            <div className="form-group col-md-5">
                                <label>Date:</label>
                                <input className="form-control" type="date" name="date"
                                    min={this.state.minDate} value={this.state.currentDate || this.state.minDate}
                                    onChange={(event) => this.handOnChange(event)} />
                            </div>
                            <div className="Schedule-time form-group row col-12">
                                {
                                    Allcode && Allcode.length > 0 ?
                                        Allcode.map((item, index) => {
                                            return (
                                                <div className="form-group col-md-3">
                                                    <div className={item.isSelect || item.isSelect === 0 ? "select-time select" : "select-time"}
                                                        onClick={() => this.handScheduleList(item.key, item.isSelect)}>
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
            </div >
        )
    }
}

export default Schedule