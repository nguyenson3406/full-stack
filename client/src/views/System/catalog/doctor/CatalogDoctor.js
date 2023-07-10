import React, { Component } from "react";
import './CatalogDoctor.scss'
import { handGetUserApi, handNewUserApi, handUpdateUserApi, handDeleteUserApi } from "../../../../services/manageServices"
import { toast } from 'react-toastify';
import Tab from 'react-bootstrap/Tab';
import CreateNew from "./CreateNew";
import Edit from "./Edit";

class CatalogDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            listUsers: '',
            Tab: 'list'
        }
    }

    setTab = (Tab) => {
        this.setState({
            Tab: Tab
        })
    }

    edit = (id) => {
        this.setTab('edit')
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

    showAvatar = () => {
        let user = this.state.listUsers
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
    }

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
        let { listUsers } = this.state;
        return (
            <div className="CatalogDoctor-background col-12">
                <div className="CatalogDoctor-container col-12">
                    <Tab.Container id="left-tabs-example" activeKey={this.state.Tab}>
                        <Tab.Content>
                            <Tab.Pane eventKey="list">
                                <div className="CatalogDoctor-content col-11">
                                    <p className="title">Doctor List</p>
                                    <button className="btn-add-new btn btn-primary mb-3" onClick={() => this.setTab("create")}>
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
                                                                <button className="btn-edit">
                                                                    <i className="fas fa-pencil-alt" onClick={() => this.edit(item.id)}></i>
                                                                </button>
                                                                <button className="btn-delete" onClick={() => this.delete(item.id)}>
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
                            </Tab.Pane>
                            <Tab.Pane eventKey="create">
                                <CreateNew list={() => this.setTab("list")}></CreateNew>
                            </Tab.Pane>
                            <Tab.Pane eventKey="edit">
                                <Edit list={() => this.setTab("list")}></Edit>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        )
    }
}

export default CatalogDoctor