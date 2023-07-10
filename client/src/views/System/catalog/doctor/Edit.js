import React, { Component } from "react";
import { toast } from 'react-toastify';
import OriginAvata from '../../../../assets/images/profile-avatar-origin.jpg'
import './Edit.scss'
import MarkDown from "../../../../components/MarkDown/MarkDown";

class Edit extends Component {
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
            roleId: '',
            avata: '',
        }

    }

    // componentDidMount() {
    //     this.listenToEmitter();
    // }

    // reset = () => {
    //     let reset = {
    //         email: '',
    //         password: '',
    //         firstName: '',
    //         lastName: '',
    //         address: '',
    //         phonenumber: '',
    //         gender: '',
    //         roleId: ''
    //     }
    //     this.setState({
    //         ...reset
    //     })
    // }

    // listenToEmitter() {
    //     emitter.on('EVENT_CLEAR_DATA', () => {
    //         this.reset()
    //     })
    // }

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
        console.log(base64)
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

    EditUser = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId']
        for (var i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        this.props.EditUser(this.state)
        this.props.list()
    }

    render() {
        let { list } = this.props
        return (
            <div className="Edit-content col-11">
                <div className="back-list">
                    <span onClick={list}>
                        <i className="fas fa-arrow-left"></i>
                        <span>Back</span>
                    </span>
                </div>
                <p className="title">Create new doctor</p>
                <div className="CreateForm">
                    <div className="row">
                        <div className="form-group col-md-3">
                            <div className="avatar">
                                <label htmlFor="avatarUpload"><img src={OriginAvata} /></label>
                                <input id="avatarUpload" type="file" name="imageUpload" onChange={(event) => this.handleFileRead(event)} hidden />
                            </div>
                        </div>
                        <div className="row col-md-9">

                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Email"
                                    onChange={(event) => this.handleOnChange(event, 'email')} value={this.state.email}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Password"
                                    onChange={(event) => this.handleOnChange(event, 'password')} value={this.state.password}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>First name</label>
                                <input type="text" className="form-control" name="firstName" placeholder="First name"
                                    onChange={(event) => this.handleOnChange(event, 'firstName')} value={this.state.firstName}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Last name</label>
                                <input type="text" className="form-control" name="lastName" placeholder="Last name"
                                    onChange={(event) => this.handleOnChange(event, 'lastName')} value={this.state.lastName}
                                />
                            </div>
                            <div className="form-group col-12">
                                <label>Address</label>
                                <input type="text" className="form-control" name="address" placeholder="Address"
                                    onChange={(event) => this.handleOnChange(event, 'address')} value={this.state.address}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Phone number</label>
                                <input type="text" className="form-control" name="phonenumber" placeholder="Phonenumber"
                                    onChange={(event) => this.handleOnChange(event, 'phonenumber')} value={this.state.phonenumber}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Gender</label>
                                <select name="gender" className="form-select"
                                    onChange={(event) => this.handleOnChange(event, 'gender')} value={this.state.gender}>
                                    <option value=''>Choose...</option>
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Position</label>
                                <select name="positionId" className="form-select"
                                    onChange={(event) => this.handleOnChange(event, 'positionId')} value={this.state.positionId}>
                                    <option value=''>Choose...</option>
                                    <option value="0">Admin</option>
                                    <option value="1">Dortor</option>
                                    <option value="2">Patient</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <MarkDown></MarkDown>
                <div className="btn-controll">
                    <button className="btn btn-primary" onClick={() => this.EditUser()}>
                        Save
                    </button>
                    <button className="btn btn-secondary" onClick={list}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }
}

export default Edit