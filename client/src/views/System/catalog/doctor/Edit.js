import React, { Component } from "react";
import { toast } from 'react-toastify';
import OriginAvata from '../../../../assets/images/profile-avatar-origin.jpg'
import MarkDown from "../../../../components/MarkDown/MarkDown";
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handGetDoctorApi, handUpdateDoctorApi } from "../../../../services/catalogDoctorServices"

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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

    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            await this.handGetDoctorData(id)
        }
    }

    handGetDoctorData = async (doctorId) => {
        let res = await handGetDoctorApi(doctorId);
        let data = res && res.data && res.data.errCode === 0 ? res.data.user : {};
        if (data) {
            this.setState({
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                positionId: data.positionId,
                image: data.image,
                Markdown: data.Markdown.contentMarkdown,
                description: data.Markdown.description,
                clinicId: data.Doctor_Infor.clinicId,
                specialtyId: data.Doctor_Infor.specialtyId,
                priceId: data.Doctor_Infor.priceId,
                provinceId: data.Doctor_Infor.provinceId,
                paymentId: data.Doctor_Infor.paymentId,
                note: data.Doctor_Infor.note,
            })
            this.props.MarkdownData(data.Markdown.contentMarkdown)
        }
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
            image: base64
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

    validateEdit = () => {
        let data = this.state
        let arrInput = ['firstName', 'lastName', 'address', 'phonenumber', 'gender']
        for (var i = 0; i < arrInput.length; i++) {
            if (!data[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        data.Markdown = this.props.dataMarkdown
        this.updateDoctor(data)
    }

    updateDoctor = async (data) => {
        try {
            let res = await handUpdateDoctorApi(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                toast.success(`Change success`, {
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
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="Edit-content col-11">
                        <div className="back-list">
                            <span onClick={() => this.backList()}>
                                <i className="fas fa-arrow-left"></i>
                                <span>Back</span>
                            </span>
                        </div>
                        <p className="title">Edit doctor</p>
                        <div className="EditForm">
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <div className="avatar">
                                        <label htmlFor="EditUpload"><img src={this.state.image ? this.state.image : OriginAvata} /></label>
                                        <input id="EditUpload" type="file" name="imageUpload" onChange={(event) => this.handleFileRead(event)} hidden />
                                    </div>
                                </div>
                                <div className="row col-md-9">

                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Email"
                                            value={this.state.email || ''} disabled
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password" placeholder="Password"
                                            value="********" disabled
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
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Specialty</label>
                                        <select name="specialtyId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'specialtyId')}
                                            value={this.state.specialtyId || ''}>
                                            <option hidden value=''>Choose...</option>
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
                            <button className="btn btn-primary" onClick={() => this.validateEdit()}>
                                Save
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
        MarkdownData: (data) => dispatch(actions.MarkdownData(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))