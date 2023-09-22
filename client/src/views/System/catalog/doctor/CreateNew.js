import React, { Component } from "react";
import { toast } from 'react-toastify';
import OriginAvata from '../../../../assets/images/profile-avatar-origin.jpg'
import MarkDown from "../../../../components/MarkDown/MarkDown";
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handNewDoctorApi, handgetExtraInfoApi } from "../../../../services/catalogDoctorServices"

class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            positionId: '',
            image: '',
            Markdown: '',
            description: '',
            clinicId: '',
            specialtyId: '',
            priceId: '',
            provinceId: '',
            paymentId: '',
            note: '',
            extraInfo: '',
        }
    }

    componentDidMount = async () => {
        await this.reset()
    }

    reset = async () => {
        let reset = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            positionId: '',
            image: '',
            Markdown: '',
            description: '',
            clinicId: '',
            specialtyId: '',
            priceId: '',
            provinceId: '',
            paymentId: '',
            note: '',
        }
        this.setState({
            ...reset
        })
        this.props.ClearMarkdown()
        await this.handGetExtraInfo()
    }

    handGetExtraInfo = async () => {
        let res = await handgetExtraInfoApi();
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            extraInfo: isRes ? res.data.data : {},
        })
    }

    handleOnChange = (event, id) => {
        let userInfoCopy = this.state
        userInfoCopy[id] = event.target.value
        this.setState({
            ...userInfoCopy
        })
    }

    handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await this.convertBase64(file)
        this.setState({
            image: base64,
        });
    }

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    validateNewDoctor = () => {
        let data = this.state
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender']
        for (var i = 0; i < arrInput.length; i++) {
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
        delete data.extraInfo
        data.Markdown = this.props.dataMarkdown
        console.log(data)
        this.createNewDoctor(data)
    }

    createNewDoctor = async (data) => {
        try {
            let res = await handNewDoctorApi(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                toast.success(`Create new user success`, {
                    className: 'toast-message'
                })
                this.backList()
            }
        } catch (e) {
            console.log(e)
        }
    }

    backList = () => {
        this.props.history.push(`/admin/catalog/doctor`)
    }

    render() {
        let { extraInfo } = this.state
        console.log(extraInfo)
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="Create-content col-11">
                        <div className="back-list">
                            <span onClick={() => this.backList()}>
                                <i className="fas fa-arrow-left"></i>
                                <span>Back</span>
                            </span>
                        </div>
                        <p className="title">Create new doctor</p>
                        <div className="CreateForm">
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <div className="avatar">
                                        <label htmlFor="CreateUpload"><img src={this.state.image ? this.state.image : OriginAvata} /></label>
                                        <input id="CreateUpload" type="file" name="imageUpload" onChange={(event) => this.handleFileRead(event)} hidden />
                                    </div>
                                </div>
                                <div className="row col-md-9">

                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Email"
                                            onChange={(event) => this.handleOnChange(event, 'email')}
                                            value={this.state.email || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password" placeholder="Password"
                                            onChange={(event) => this.handleOnChange(event, 'password')}
                                            value={this.state.password || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>First name</label>
                                        <input type="text" className="form-control" name="firstName" placeholder="First name"
                                            onChange={(event) => this.handleOnChange(event, 'firstName')}
                                            value={this.state.firstName || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Last name</label>
                                        <input type="text" className="form-control" name="lastName" placeholder="Last name"
                                            onChange={(event) => this.handleOnChange(event, 'lastName')}
                                            value={this.state.lastName || ''}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <label>Address</label>
                                        <input type="text" className="form-control" name="address" placeholder="Address"
                                            onChange={(event) => this.handleOnChange(event, 'address')}
                                            value={this.state.address || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-9">
                                        <label>Phone number</label>
                                        <input type="text" className="form-control" name="phonenumber" placeholder="Phonenumber"
                                            onChange={(event) => this.handleOnChange(event, 'phonenumber')}
                                            value={this.state.phonenumber || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>Gender</label>
                                        <select name="gender" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'gender')}
                                            value={this.state.gender || ''}>
                                            <option hidden value=''>Choose...</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Clinic</label>
                                        <select name="clinicId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'clinicId')}
                                            value={this.state.clinicId || ''}>
                                            <option hidden value=''>Choose...</option>
                                            {extraInfo && extraInfo.clinics.length > 0 && extraInfo.clinics ?
                                                extraInfo.clinics.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                                : null
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Specialty</label>
                                        <select name="specialtyId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'specialtyId')}
                                            value={this.state.specialtyId || ''}>
                                            <option hidden value=''>Choose...</option>
                                            {extraInfo && extraInfo.specialtys.length > 0 && extraInfo.specialtys ?
                                                extraInfo.specialtys.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                                : null
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Position</label>
                                        <select name="positionId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'positionId')}
                                            value={this.state.positionId || ''}>
                                            <option hidden value=''>Choose...</option>
                                            <option value="P0">None</option>
                                            <option value="P1">Mater</option>
                                            <option value="P2">Doctor</option>
                                            <option value="P3">Associate Professor</option>
                                            <option value="P4">Professor</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Price</label>
                                        <select name="priceId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'priceId')}
                                            value={this.state.priceId || ''}>
                                            <option hidden value=''>Choose...</option>
                                            <option value='PRI1'>10</option>
                                            <option value='PRI2'>15</option>
                                            <option value='PRI3'>20</option>
                                            <option value='PRI4'>25</option>
                                            <option value='PRI5'>30</option>
                                            <option value='PRI6'>35</option>
                                            <option value='PRI7'>40</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Province</label>
                                        <select name="provinceId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'provinceId')}
                                            value={this.state.provinceId || ''}>
                                            <option hidden value=''>Choose...</option>
                                            <option value='PRO1'>Ha Noi</option>
                                            <option value='PRO2'>Ho Chi Minh</option>
                                            <option value='PRO3'>Da Nang</option>
                                            <option value='PRO4'>Can Tho</option>
                                            <option value='PRO5'>Binh Duong</option>
                                            <option value='PRO6'>Dong Nai</option>
                                            <option value='PRO7'>Quang Ninh</option>
                                            <option value='PRO8'>Hue</option>
                                            <option value='PRO9'>Quang Binh</option>
                                            <option value='PRO10'>Khanh Hoa</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Payment</label>
                                        <select name="paymentId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'paymentId')}
                                            value={this.state.paymentId || ''}>
                                            <option hidden value=''>Choose...</option>
                                            <option value='PAY1'>Cash</option>
                                            <option value='PAY2'>Credit card</option>
                                            <option value='PAY3'>All payment method</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Note</label>
                                        <textarea name="note" className="form-control"
                                            onChange={(event) => this.handleOnChange(event, 'note')}
                                            value={this.state.note || ''}>
                                        </textarea>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Description</label>
                                        <textarea name="description" className="form-control"
                                            onChange={(event) => this.handleOnChange(event, 'description')}
                                            value={this.state.description || ''}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MarkDown urlUpdate={`http://localhost:8080/api/catalogDoctor/uploadFile`}></MarkDown>
                        <div className="btn-controll">
                            <button className="btn btn-primary" onClick={() => this.validateNewDoctor()}>
                                Add New
                            </button>
                            <button className="btn btn-secondary" onClick={() => this.backList()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataMarkdown: state.markdown.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ClearMarkdown: () => dispatch(actions.ClearMarkdown())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateNew))