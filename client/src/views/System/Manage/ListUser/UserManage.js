import React, { Component } from "react";
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
            currentPage: 1,
            rowPage: 5,
            totalPage: '',
            maxRow: '',
            Tab: 'list'
        }
    }

    async componentDidMount() {
        await this.handGetUserData()
    }

    handGetUserData = async () => {
        let res = await handGetUserApi();
        let { rowPage } = this.state
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            listUsers: isRes ? res.data.user : {},
            maxRow: isRes ? res.data.user.length : 0,
            totalPage: isRes ? Math.ceil(res.data.user.length / rowPage) : 1,
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
        emitter.emit('USER_RESET_DATA', data)
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
        this.setState({
            filterKey: event.target.value
        })
    }

    setPage = (event) => {
        let { currentPage, totalPage } = this.state
        switch (event) {
            case 'next':
                ++currentPage
                break;
            case 'prev':
                --currentPage
                break;
            case 'first':
                currentPage = 1
                break;
            default:
                currentPage = totalPage
                break;
        }
        this.setState({
            currentPage: currentPage
        })
    }

    setRow = (event) => {
        let { maxRow, currentPage } = this.state
        if (maxRow === 0) {
            return this.setState({
                rowPage: event,
                totalPage: 0,
                currentPage: 0
            })
        }
        if (event * currentPage > maxRow) {
            this.setState({
                rowPage: event,
                totalPage: Math.ceil(maxRow / event),
                currentPage: Math.ceil(maxRow / event)
            })
        } else {
            this.setState({
                rowPage: event,
                totalPage: Math.ceil(maxRow / event)
            })
        }
    }

    render() {
        let { listUsers, filterKey, currentPage, rowPage, maxRow, totalPage } = this.state;
        let minRowPage = (currentPage - 1) * rowPage + 1
        let maxRowPage = currentPage * rowPage > maxRow ? maxRow : (currentPage * rowPage)
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <Tab.Container id="left-tabs-example" activeKey={this.state.Tab}>
                        <Tab.Content>
                            <Tab.Pane eventKey="list">
                                <div className="List-content col-11">
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
                                                    if (minRowPage <= index || index <= maxRowPage) {
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
                                                    }
                                                })
                                                : null
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="6">
                                                    <div className="page-controll col-12 row">
                                                        <div className="Row-dropdown col-3 row">
                                                            <span className="col-8">Rows per page:</span>
                                                            <div className="box-row col-4">
                                                                <span>{rowPage === maxRow ? 'All' : rowPage}<i className="fas fa-caret-down"></i></span>
                                                                <div className="content-dropdown">
                                                                    <div onClick={() => this.setRow(5)}><span>5</span></div>
                                                                    <div onClick={() => this.setRow(10)}><span>10</span></div>
                                                                    <div onClick={() => this.setRow(25)}><span>25</span></div>
                                                                    <div onClick={() => this.setRow(maxRow)}><span>All</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row-number">
                                                            <span>{maxRow === 0 ? 0 : minRowPage}<span> - </span>
                                                                {maxRowPage}
                                                                <span> of </span>{maxRow}
                                                            </span>
                                                        </div>
                                                        <div className="chance-page">

                                                            <button onClick={() => this.setPage('first')}
                                                                disabled={currentPage <= 1 ? true : false}>
                                                                <i className="fas fa-angle-double-left"></i>
                                                            </button>
                                                            <button onClick={() => this.setPage('prev')}
                                                                disabled={currentPage <= 1 ? true : false}>
                                                                <i className="fas fa-chevron-left"></i>
                                                            </button>
                                                            <button onClick={() => this.setPage('next')}
                                                                disabled={currentPage >= totalPage ? true : false}>
                                                                <i className="fas fa-chevron-right"></i>
                                                            </button>
                                                            <button onClick={() => this.setPage('last')}
                                                                disabled={currentPage >= totalPage ? true : false}>
                                                                <i className="fas fa-angle-double-right"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
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