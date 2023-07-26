import React, { Component } from "react";
import { emitter } from "../../../../utils/emitter"
import { toast } from 'react-toastify';
import OriginAvata from '../../../../assets/images/profile-avatar-origin.jpg'

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            avata: '',
            image: '',
        }
    }

    componentDidMount = async () => {
        await this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('USER_RESET_DATA', (data) => {
            this.setState({
                id: data.id,
                email: data.email,
                password: '********',
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                avata: data.image,
                image: '',
            })
        })
    }

    handleOnChange = (event, id) => {
        let userInfoCopy = { ...this.state }
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
            avata: base64
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

    updateUser = () => {
        let data = this.state
        let arrInput = ['firstName', 'lastName', 'address']
        for (var i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        this.props.updateUser(data)
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
                <p className="title">Edit user</p>
                <div className="EditForm">
                    <div className="row">
                        <div className="form-group col-md-3">
                            <div className="avatar">
                                <label htmlFor="EditUpload">
                                    <img src={this.state.avata ? this.state.avata : OriginAvata} />
                                </label>
                                <input id="EditUpload" type="file" name="imageUpload"
                                    onChange={(event) => this.handleFileRead(event)}
                                    hidden
                                />
                            </div>
                        </div>
                        <div className="row col-md-9">

                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Email"
                                    onChange={(event) => this.handleOnChange(event, 'email')}
                                    value={this.state.email || ''}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Password"
                                    onChange={(event) => this.handleOnChange(event, 'password')}
                                    value={this.state.password || ''}
                                    disabled
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
                            <div className="form-group col-md-8">
                                <label>Phone number</label>
                                <input type="text" className="form-control" name="phonenumber" placeholder="Phonenumber"
                                    onChange={(event) => this.handleOnChange(event, 'phonenumber')}
                                    value={this.state.phonenumber || ''}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Gender</label>
                                <select name="gender" className="form-select"
                                    onChange={(event) => this.handleOnChange(event, 'gender')}
                                    value={this.state.gender || ''}>
                                    <option value=''>Choose...</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-controll mt-3">
                    <button className="btn btn-primary" onClick={() => this.updateUser()}>
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

export default EditUser