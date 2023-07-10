import React, { Component } from "react";
import { toast } from 'react-toastify';
import OriginAvata from '../../../../assets/images/profile-avatar-origin.jpg'
import './Profile.scss'
import { Tab } from "react-bootstrap";
import Setting from "./Setting";
import * as actions from '../../../../store/actions/index'
import { connect } from "react-redux";
import { emitter } from "../../../../utils/emitter"
import { handGetUserApi, handUpdateUserApi, handChancePassword } from '../../../../services/manageServices'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Tab: 'profile'
        }
    }

    componentDidMount = async () => {
        await this.getProfileData()
    }

    getProfileData = async () => {
        let userId = this.props.dataUser.id
        let res = await handGetUserApi(userId);
        let data = res && res.data && res.data.errCode === 0 ? res.data.user : {};
        this.props.ProfileData(data)
    }

    setTab = (Tab) => {
        this.setState({
            Tab: Tab
        })
        emitter.emit('EVENT_RESET_DATA')
    }

    SettingUser = async (data) => {
        try {
            let res = await handUpdateUserApi(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.getProfileData();
                toast.success(`Chance info success`, {
                    className: 'toast-message'
                })
                this.setTab('profile')
            }

        } catch (e) {
            console.log(e)
        }
    }

    SecurityUser = async (data) => {
        try {
            let res = await handChancePassword(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                toast.success(`Chance password success`, {
                    className: 'toast-message'
                })
                this.setTab('profile')
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let dataProfile = this.props.dataProfile

        return (
            <div className="Profile-container col-12">
                <Tab.Container id="left-tabs-example" activeKey={this.state.Tab}>
                    <Tab.Content>
                        <Tab.Pane eventKey="profile">
                            <div className="Profile-content col-11">
                                <p className="title">Overview</p>
                                <div className="Overview row">
                                    <div className="col-md-2">
                                        <div className="avatar col-md-9">
                                            <img src={dataProfile.image ? dataProfile.image : OriginAvata} />
                                        </div>
                                    </div>
                                    <div className="info-user row col-md-7">
                                        <div className="account-user col-md-12">
                                            <span className="title">Email:</span>
                                            <span>{dataProfile.email}</span>
                                        </div>
                                        <div className="col-md-12">
                                            <span className="title">First name:</span>
                                            <span>{dataProfile.firstName}</span>
                                        </div>
                                        <div className="col-md-12">
                                            <span className="title">Last name:</span>
                                            <span>{dataProfile.lastName}</span>
                                        </div>
                                        <div className="col-12">
                                            <span className="title">Address:</span>
                                            <span>{dataProfile.address ? dataProfile.address : <span className="eddit" onClick={() => this.setTab('setting')}>Cap nhat</span>}</span>
                                        </div>
                                        <div className="col-md-12">
                                            <span className="title">Phone number:</span>
                                            <span>{dataProfile.phonenumber ? dataProfile.phonenumber : <span className="eddit" onClick={() => this.setTab('setting')}>Cap nhat</span>}</span>
                                        </div>
                                        <div className="col-md-12">
                                            <span className="title">Gender:</span>
                                            <span>{dataProfile.gender ? dataProfile.gender : <span className="eddit" onClick={() => this.setTab('setting')}>Cap nhat</span>}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary" onClick={() => this.setTab('setting')}><i className="fas fa-user-cog"></i> Setting</button>
                                    </div>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="setting">
                            <Setting SecurityUser={(event) => this.SecurityUser(event)} SettingUser={(event) => this.SettingUser(event)} profile={() => this.setTab("profile")}></Setting>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataUser: state.user.userInfo,
        dataProfile: state.profile.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ProfileData: (data) => dispatch(actions.ProfileData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)