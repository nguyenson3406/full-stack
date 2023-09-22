import React, { Component } from "react";
import './Booking.scss'
import Modal from 'react-bootstrap/Modal';
import { emitter } from "../../utils/emitter";
import BookingDescription from './BookingDescription'
import { handCreateBookingApi } from "../../services/pageServices";
import { toast } from 'react-toastify';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            timeType: '',
            date: '',
            timeData: '',
            scheduleId: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            doctorName: ''
        }
    }

    componentDidMount = async () => {
        await this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('BOOKING_RESET_DATA', (data) => {
            this.setState({
                id: data.id,
                timeType: data.timeType,
                date: data.date,
                timeData: data.timeData,
                scheduleId: data.scheduleId,
                email: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '',
                doctorName: ''
            })
        })
    }

    handChangeDoctorName = (data) => {
        this.setState({
            doctorName: data
        })
    }

    handleOnChange = (event, id) => {
        let copyBooking = this.state
        copyBooking[id] = event.target.value
        this.setState({
            ...copyBooking
        })
    }

    validateBooking = () => {
        let data = this.state
        let arrInput = ['id', 'timeType', 'date', 'timeData', 'scheduleId', 'email',
            'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'doctorName']
        for (let i = 0; i < arrInput.length; i++) {
            if (!data[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!data.email.match(isValidEmail)) {
            return (toast.error(`Enter valid Email!`, {
                className: 'toast-message'
            }))
        }
        this.handCreateBooking(data)
    }

    handCreateBooking = async (data) => {
        try {
            let res = await handCreateBookingApi(data)
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                toast.success(`Your booking success`, {
                    className: 'toast-message'
                })
                this.props.handToggle()
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let { toggle, handToggle } = this.props
        return (
            <div className="Booking-container">
                <Modal show={toggle} onHide={handToggle} size="lg"
                    className="Booking-content" centered>
                    <Modal.Header>
                        <div className="header-content col-12">
                            <span className="title">{i18next.t("booking.title")}</span>
                            <span className="close" onClick={handToggle}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="BookingDescription">
                            <BookingDescription id={this.state.id} doctorName={(event) => this.handChangeDoctorName(event)}
                                timeData={this.state.timeData}>
                            </BookingDescription>
                        </div>
                        <div className="BookingForm">
                            <div className="row col-md-12">
                                <div className="form-group col-md-6">
                                    <label>{i18next.t("booking.firstName")}</label>
                                    <input type="text" className="form-control" name="firstName" placeholder="First name"
                                        onChange={(event) => this.handleOnChange(event, 'firstName')}
                                        value={this.state.firstName || ''}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>{i18next.t("booking.lastName")}</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="Last name"
                                        onChange={(event) => this.handleOnChange(event, 'lastName')}
                                        value={this.state.lastName || ''}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label>{i18next.t("booking.email")}</label>
                                    <input type="email" className="form-control" name="email" placeholder="Email"
                                        onChange={(event) => this.handleOnChange(event, 'email')}
                                        value={this.state.email || ''}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <label>{i18next.t("booking.address")}</label>
                                    <input type="text" className="form-control" name="address" placeholder="Address"
                                        onChange={(event) => this.handleOnChange(event, 'address')}
                                        value={this.state.address || ''}
                                    />
                                </div>
                                <div className="form-group col-md-8">
                                    <label>{i18next.t("booking.phone")}</label>
                                    <input type="text" className="form-control" name="phonenumber" placeholder="Phonenumber"
                                        onChange={(event) => this.handleOnChange(event, 'phonenumber')}
                                        value={this.state.phonenumber || ''}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>{i18next.t("booking.gender.title")}</label>
                                    <select name="gender" className="form-select"
                                        onChange={(event) => this.handleOnChange(event, 'gender')}
                                        value={this.state.gender || ''}>
                                        <option value=''>{i18next.t("booking.gender.default")}</option>
                                        <option value="M">{i18next.t("booking.gender.male")}</option>
                                        <option value="F">{i18next.t("booking.gender.female")}</option>
                                        <option value="O">{i18next.t("booking.gender.other")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => this.validateBooking()}>
                            {i18next.t("booking.save")}
                        </button>
                        <button className="btn btn-secondary" onClick={handToggle}>
                            {i18next.t("booking.close")}
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default withTranslation()(Booking)