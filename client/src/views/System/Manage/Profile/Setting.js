import React, { Component } from "react";
import { toast } from 'react-toastify';
import OriginAvata from '../../../../assets/images/profile-avatar-origin.jpg'
import './Setting.scss'
import { Tab } from "react-bootstrap";
import * as actions from '../../../../store/actions/index'
import { connect } from "react-redux";
import { emitter } from "../../../../utils/emitter"

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            avata: '',
            image: '',
            CurrentPassword: '',
            NewPassword: '',
            Tab: 'account'
        }
    }

    componentDidMount() {
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_RESET_DATA', () => {
            this.reset()
        })
    }

    reset = () => {
        let dataProfile = this.props.dataProfile
        this.setState({
            id: dataProfile.id,
            email: dataProfile.email,
            firstName: dataProfile.firstName,
            lastName: dataProfile.lastName,
            address: dataProfile.address,
            phonenumber: dataProfile.phonenumber,
            gender: dataProfile.gender,
            avata: dataProfile.image,
            image: '',
            CurrentPassword: '',
            NewPassword: '',
        })
    }

    setTab = (Tab) => {
        this.setState({
            Tab: Tab
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
        console.log(base64)
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

    SettingUser = () => {
        let data = this.state
        let arrInput = ['firstName', 'lastName']
        for (var i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        this.props.SettingUser(data)
    }

    SecurityUser = () => {
        let data = this.state
        let arrInput = ['CurrentPassword', 'NewPassword']
        for (var i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        this.props.SecurityUser(data)
    }

    render() {
        let { profile } = this.props
        return (
            <div className="Setting-content col-11">
                <div className="back-list">
                    <span onClick={profile}>
                        <i className="fas fa-arrow-left"></i>
                        <span>Back</span>
                    </span>
                </div>
                <p className="title">Setting</p>
                <div className="row">
                    <div className="setting-option col-3">
                        <div className={this.state.Tab === 'account' ? "select" : ""}
                            onClick={() => this.setTab('account')}>
                            <p><i className="fas fa-user-circle"></i> Account</p>
                            <p>Manage your public profile and private information </p>
                        </div>
                        <div className={this.state.Tab === 'security' ? "select" : ""}
                            onClick={() => this.setTab('security')}>
                            <p><i className="fas fa-lock"></i> Security</p>
                            <p>Manage your password and 2-step verification preferences </p>
                        </div>
                    </div>
                    <div className="col-9">
                        <Tab.Container id="left-tabs-example" activeKey={this.state.Tab}>
                            <Tab.Content>
                                <Tab.Pane eventKey="account">
                                    <div className="AccountForm">
                                        <div className="row">
                                            <div className="form-group col-md-3">
                                                <div className="avatar col-8">
                                                    <label htmlFor="avatarUpload">
                                                        <img src={this.state.avata ? this.state.avata : OriginAvata} />
                                                    </label>
                                                    <input id="avatarUpload" type="file" name="imageUpload"
                                                        onChange={(event) => this.handleFileRead(event)} hidden />
                                                </div>
                                            </div>
                                            <div className="row col-md-9">

                                                <div className="form-group col-md-6">
                                                    <label>Email</label>
                                                    <input type="email" className="form-control" name="email" placeholder="Email"
                                                        onChange={(event) => this.handleOnChange(event, 'email')}
                                                        value={this.state.email || ""}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>First name</label>
                                                    <input type="text" className="form-control" name="firstName" placeholder="First name"
                                                        onChange={(event) => this.handleOnChange(event, 'firstName')}
                                                        value={this.state.firstName || ""}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Last name</label>
                                                    <input type="text" className="form-control" name="lastName" placeholder="Last name"
                                                        onChange={(event) => this.handleOnChange(event, 'lastName')}
                                                        value={this.state.lastName || ""}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Phone number</label>
                                                    <input type="text" className="form-control" name="phonenumber" placeholder="Phonenumber"
                                                        onChange={(event) => this.handleOnChange(event, 'phonenumber')}
                                                        value={this.state.phonenumber || ""}
                                                    />
                                                </div>
                                                <div className="form-group col-9">
                                                    <label>Address</label>
                                                    <input type="text" className="form-control" name="address" placeholder="Address"
                                                        onChange={(event) => this.handleOnChange(event, 'address')}
                                                        value={this.state.address || ""}
                                                    />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label>Gender</label>
                                                    <select name="gender" className="form-select"
                                                        onChange={(event) => this.handleOnChange(event, 'gender')}
                                                        value={this.state.gender || ""}>
                                                        <option value=''>Choose...</option>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                        <option value="O">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-controll">
                                        <button className="btn btn-primary" onClick={() => this.SettingUser()}>
                                            Save
                                        </button>
                                        <button className="btn btn-secondary" onClick={profile}>
                                            Cancel
                                        </button>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="security">
                                    <div className="SecurityForm col-8">
                                        <div className="form-group col-md-9">
                                            <label>Current password</label>
                                            <input type="password" className="form-control" name="CurrentPassword" placeholder="Current password"
                                                onChange={(event) => this.handleOnChange(event, 'CurrentPassword')} value={this.state.CurrentPassword}
                                            />
                                        </div>
                                        <div className="form-group col-md-9">
                                            <label>New password</label>
                                            <input type="password" className="form-control" name="NewPassword" placeholder="New password"
                                                onChange={(event) => this.handleOnChange(event, 'NewPassword')} value={this.state.NewPassword}
                                            />
                                        </div>
                                    </div>

                                    <div className="btn-controll col-9">
                                        <button className="btn btn-primary" onClick={() => this.SecurityUser()}>
                                            Save
                                        </button>
                                        <button className="btn btn-secondary" onClick={profile}>
                                            Cancel
                                        </button>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataProfile: state.profile.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ProfileData: (data) => dispatch(actions.ProfileData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting)