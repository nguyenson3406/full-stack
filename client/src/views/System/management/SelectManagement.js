import React, { Component } from "react";
import Select from 'react-select'
import { handGetDoctorApi } from "../../../services/inforManagementServices"
import moment from 'moment/dist/moment';
import "./SelectManagement.scss"
import { connect } from "react-redux";

class SelectManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: '',
            minDate: '',
            currentDate: '',
            doctorId: '',
            timeSelect: '',
        }
    }

    componentDidMount = async () => {
        let dataUser = this.props.dataUser
        this.getDate()
        await this.handGetDoctorData()
        if (dataUser.roleId.includes('R3')) {
            this.props.getId(dataUser.id)
        }
    }

    handGetDoctorData = async () => {
        let res = await handGetDoctorApi();
        let data = res && res.data && res.data.errCode === 0 ? res.data.data : {}
        let copyList = []
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
    }

    getDate = () => {
        let date = ''
        let isBooking = this.props.isBooking
        if (!isBooking) {
            date = moment().add(1, 'days').format('YYYY-MM-DD')
            this.setState({
                minDate: date,
                currentDate: date,
            })
        } else {
            date = moment().format('YYYY-MM-DD')
            this.setState({
                currentDate: date,
            })
        }
    }

    handOnChange = (event) => {
        this.props.getDate(event.target.value)
        this.setState({
            currentDate: event.target.value
        })
    }

    handOnChangeDoctorId = async (doctorId) => {
        this.props.getId(doctorId.value)
        this.setState({
            doctorId: doctorId.value
        })
    }

    render() {
        let isBooking = this.props.isBooking
        let dataUser = this.props.dataUser
        return (
            <div className="management-select row col-12">
                {!dataUser.roleId.includes('R3') ?
                    <div className="form-group col-md-5">
                        <label className="col-12">Doctor:</label>
                        <Select className="Doctor-list" options={this.state.listDoctor}
                            onChange={this.handOnChangeDoctorId}
                        />
                    </div>
                    : null
                }

                <div className="form-group col-md-5">
                    <label>Date:</label>
                    {isBooking ?
                        <input className="form-control" type="date" name="date"
                            value={this.state.currentDate}
                            onChange={(event) => this.handOnChange(event)} />
                        :
                        <input className="form-control" type="date" name="date"
                            min={this.state.minDate} value={this.state.currentDate || this.state.minDate}
                            onChange={(event) => this.handOnChange(event)} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataUser: state.user.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectManagement)