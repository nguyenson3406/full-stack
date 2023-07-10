import React, { Component } from "react";
import './UserManage.scss'
import { handGetUserApi, handNewUserApi, handUpdateUserApi, handDeleteUserApi } from "../../../../services/manageServices"
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { emitter } from "../../../../utils/emitter"
import { toast } from 'react-toastify';
import Tab from 'react-bootstrap/Tab';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            listUsers: '',
            sortTitle: '',
            idSortDown: false,
            filterKey: '',
            Tab: 'list'
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

    setTab = (Tab) => {
        emitter.emit('CREATE_RESET_DATA')
        this.setState({
            Tab: Tab
        })
    }

    editUser = async (userId) => {
        let res = await handGetUserApi(userId);
        let data = res && res.data && res.data.errCode === 0 ? res.data.user : {};
        console.log(data)
        emitter.emit('EDIT_RESET_DATA', data)
        this.setState({
            userId: userId,
            Tab: 'edit'
        })
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
                toast.success(`Create new user success`, {
                    className: 'toast-message'
                })
                this.setTab('list')
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
                toast.success(`Chance info success`, {
                    className: 'toast-message'
                })
                this.setTab('list')
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

    sortList = (key) => {
        let sortTitle = this.state.sortTitle
        let sortList = ''
        if (key === sortTitle) {
            sortList = this.sortDown(key)
        } else {
            sortList = this.sortUp(key)
        }
        this.setState({
            listUsers: sortList
        })
    }

    sortUp = (key) => {
        let copyListUsers = ''
        copyListUsers = [...this.state.listUsers].sort((a, b) =>
            a[key] > b[key] ? 1 : -1
        )
        this.setState({
            idSortDown: false,
            sortTitle: key
        })
        return copyListUsers;
    }

    sortDown = (key) => {
        let copyListUsers = ''
        let keyDown = key
        if (this.state.idSortDown) {
            keyDown = 'id'
            return this.sortUp(keyDown)
        } else {
            copyListUsers = [...this.state.listUsers].sort((a, b) =>
                a[keyDown] < b[keyDown] ? 1 : -1
            )
        }
        this.setState({
            idSortDown: true,
            sortTitle: keyDown
        })
        return copyListUsers;
    }

    setClassSort = (title, isDown) => {
        let { sortTitle, idSortDown } = this.state
        if (isDown) {
            if (sortTitle === title && idSortDown) {
                return "select fas fa-long-arrow-alt-down"
            }
            return "fas fa-long-arrow-alt-down"
        } else {
            if (sortTitle === title && !idSortDown) {
                return "select fas fa-long-arrow-alt-up"
            }
            return "fas fa-long-arrow-alt-up"
        }
    }

    setFilter = (event) => {
        let key = event.target.value
        this.setState({
            filterKey: event.target.value
        })
    }

    render() {
        let { listUsers, filterKey } = this.state;
        return (
            <div className="UserManage-background col-12">
                <div className="UserManage-container col-12">
                    <Tab.Container id="left-tabs-example" activeKey={this.state.Tab}>
                        <Tab.Content>
                            <Tab.Pane eventKey="list">
                                <div className="UserManage-content col-11">
                                    <p className="title">Users List</p>
                                    <button className="btn-add-new btn btn-primary mb-3" onClick={() => this.setTab("create")}>
                                        <i className="fas fa-plus"></i> Add New User
                                    </button>

                                    <div className="search-content col-3 form-group row">
                                        <i className="fas fa-search"></i>
                                        <input type="text" className="form-control" placeholder="Tim kiem"
                                            onChange={(event) => this.setFilter(event)} value={filterKey}
                                        />
                                    </div>

                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th className="sortList"
                                                    onClick={() => this.sortList('email')}>
                                                    <span>Email</span>
                                                    <i className={this.setClassSort('email', true)}></i>
                                                    <i className={this.setClassSort('email', false)}></i>
                                                </th>
                                                <th className="sortList"
                                                    onClick={() => this.sortList('firstName')}>
                                                    <span>First Name</span>
                                                    <i className={this.setClassSort('firstName', true)}></i>
                                                    <i className={this.setClassSort('firstName', false)}></i>
                                                </th>
                                                <th className="sortList"
                                                    onClick={() => this.sortList('lastName')}>
                                                    <span>Last Name</span>
                                                    <i className={this.setClassSort('lastName', true)}></i>
                                                    <i className={this.setClassSort('lastName', false)}></i>
                                                </th>
                                                <th className="sortList"
                                                    onClick={() => this.sortList('address')}>
                                                    <span>Address</span>
                                                    <i className={this.setClassSort('address', true)}></i>
                                                    <i className={this.setClassSort('address', false)}></i>
                                                </th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listUsers && listUsers.length > 0 ?
                                                listUsers.filter(item =>
                                                    filterKey.trim() === '' ? item
                                                        : item.email.includes(filterKey.trim()) ||
                                                        item.firstName.includes(filterKey.trim()) ||
                                                        item.lastName.includes(filterKey.trim()) ||
                                                        item.address.includes(filterKey.trim())
                                                ).map((item, index) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.firstName}</td>
                                                            <td>{item.lastName}</td>
                                                            <td>{item.address}</td>
                                                            <td>
                                                                <button className="btn-edit" onClick={() => this.editUser(item.id)}>
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
                            </Tab.Pane>
                            <Tab.Pane eventKey="create">
                                <CreateUser list={() => this.setTab("list")}
                                    createNewUser={(event) => this.createNewUser(event)} ></CreateUser>
                            </Tab.Pane>
                            <Tab.Pane eventKey="edit">
                                <EditUser list={() => this.setTab("list")}
                                    updateUser={(event) => this.updateUser(event)} ></EditUser>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        )
    }
}

export default UserManage