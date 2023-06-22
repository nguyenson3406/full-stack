import React, { Component } from "react";
import './UserManage.scss'
import { handGetUserApi, handNewUserApi, handUpdateUserApi, handDeleteUserApi } from "../../../services/manageServices"
import ModalUser from "./ModalUser";
import ModalEdit from "./ModalEdit";
import { emitter } from "../../../utils/emitter"
import { toast } from 'react-toastify';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            listUsers: '',
            showEdit: false,
            showUser: false,
        }
    }

    async componentDidMount() {
        await this.handGetUserData()
    }

    handGetUserData = async () => {
        let res = await handGetUserApi();
        this.setState({
            listUsers: res && res.data && res.data.errCode === 0 ? res.data.user : {}
        })
    }

    handleClose = () => {
        this.setState({
            showEdit: false,
            showUser: false
        })
    };

    handleShow = (data) => {
        if (!data) {
            this.setState({
                showUser: true
            })
            emitter.emit('EVENT_CLEAR_DATA')
        } else {
            this.setState({
                showEdit: true
            })
            emitter.emit('EVENT_EDIT_DATA', data)
        }
        console.log(data)
    };

    createNewUser = async (data) => {
        try {
            let res = await handNewUserApi(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetUserData();
            }
        } catch (e) {
            console.log(e)
        }
    }

    updateUser = async (data) => {
        try {
            let res = await handUpdateUserApi(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetUserData();
            }

        } catch (e) {
            console.log(e)
        }
    }

    deleteUser = async (userId) => {
        try {
            let res = await handDeleteUserApi(userId);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetUserData();
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let { listUsers, showUser, showEdit } = this.state;
        return (
            <div className="UserManage-background">
                <div className="UserManage-container col-12">
                    <ModalUser show={showUser} handleClose={this.handleClose}
                        createNewUser={(event) => this.createNewUser(event)} ></ModalUser>
                    <ModalEdit show={showEdit} handleClose={this.handleClose}
                        updateUser={(event) => this.updateUser(event)} ></ModalEdit>
                    <div className="UserManage-content col-11">
                        <p className="title">Users List</p>
                        <button className="btn-add-new btn btn-primary mb-3" onClick={() => this.handleShow()}>
                            <i className="fas fa-plus"></i> Add New User</button>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    listUsers.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className="btn-edit" onClick={() => this.handleShow(item)}>
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button className="btn-delete" onClick={() => this.deleteUser(item.id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserManage