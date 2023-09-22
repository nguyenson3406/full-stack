import React, { Component } from "react";
import './Booking.scss'
import { handGetAllBookingApi, handUpdateBookingApi } from "../../../../services/inforManagementServices";
import SelectManagement from "../SelectManagement";
import moment from 'moment/dist/moment';
import Remedy from "./Remedy";
import { toast } from 'react-toastify';
import { emitter } from "../../../../utils/emitter";
import { connect } from "react-redux";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            doctorId: '',
            listBooking: '',
            sortTitle: '',
            idSortDown: false,
            currentPage: 1,
            rowPage: 5,
            totalPage: 1,
            maxRow: 0,
            toggle: false,
        }
    }

    componentDidMount = async () => {
        let date = moment().format('YYYY-MM-DD')
        this.getDate(date)
    }

    handGetAllBooking = async (doctorId) => {
        let res = await handGetAllBookingApi(doctorId);
        let { rowPage } = this.state
        let data = res && res.data && res.data.errCode === 0 ? res.data.data : {}
        this.setState({
            listBooking: data,
            doctorId: doctorId,
            maxRow: data ? data.length : 0,
            totalPage: data ? Math.ceil(data.length / rowPage) : 1,
        })
    }

    getDate = (date) => {
        this.setState({
            date: date
        })
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
            listBooking: sortList
        })
    }

    sortUp = (key) => {
        let copylistBooking = ''
        copylistBooking = [...this.state.listBooking].sort((a, b) =>
            a[key] > b[key] ? 1 : -1
        )
        this.setState({
            idSortDown: false,
            sortTitle: key
        })
        return copylistBooking;
    }

    sortDown = (key) => {
        let copylistBooking = ''
        let keyDown = key
        if (this.state.idSortDown) {
            keyDown = 'id'
            return this.sortUp(keyDown)
        } else {
            copylistBooking = [...this.state.listBooking].sort((a, b) =>
                a[keyDown] < b[keyDown] ? 1 : -1
            )
        }
        this.setState({
            idSortDown: true,
            sortTitle: keyDown
        })
        return copylistBooking;
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

    handUpdateBooking = async (data) => {
        try {
            let doctorId = this.state.doctorId
            let res = await handUpdateBookingApi(data)
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                if (data.isDone) {
                    this.handToggle()
                }
                await this.handGetAllBooking(doctorId);
                toast.success(`Update success`, {
                    className: 'toast-message'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    handToggle = (id) => {
        let { listBooking } = this.state
        let data = {
            id: id,
            isDone: true,
        }
        listBooking.map(item => {
            if (item.id === id) {
                data.firstName = item.patientData.firstName
                data.email = item.patientData.email
            }
        })
        console.log(data)
        emitter.emit('REMEDY_RESET_DATA', data)
        this.setState({
            toggle: !this.state.toggle
        })
    }

    cancelUpdate = async (id) => {
        let data = {
            id: id,
            isDone: false,
        }
        await this.handUpdateBooking(data)
    }

    render() {
        let { listBooking, currentPage, rowPage, maxRow, totalPage, date, toggle } = this.state;
        let dataUser = this.props.dataUser
        console.log(listBooking)
        let minRowPage = (currentPage - 1) * rowPage + 1
        let maxRowPage = currentPage * rowPage > maxRow ? maxRow : (currentPage * rowPage)
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <Remedy toggle={toggle} handToggle={() => this.handToggle()} handUpdateBooking={(event) => this.handUpdateBooking(event)}></Remedy>
                    <div className="List-content col-11">
                        <p className="title">Booking List</p>
                        <SelectManagement getId={(event) => this.handGetAllBooking(event)}
                            getDate={(event) => this.getDate(event)} isBooking={true}
                        ></SelectManagement>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th className="sortList"
                                        onClick={() => this.sortList('timeType')}>
                                        <span>Time</span>
                                        <i className={this.setClassSort('timeType', true)}></i>
                                        <i className={this.setClassSort('timeType', false)}></i>
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
                                    <th>Status</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBooking && listBooking.length > 0 ?
                                    listBooking.filter(item =>
                                        date === '' ? item
                                            : item.date.includes(date)
                                    ).map((item, index) => {
                                        if (minRowPage <= index || index <= maxRowPage) {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.timeData.value_en}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.lastName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.statusData.value_en}</td>
                                                    <td>{item.patientData.genderData.value_en}</td>
                                                    {!item.statusId.includes('S3') && !item.statusId.includes('S4') ?
                                                        <td>
                                                            <button className="btn-done" onClick={() => this.handToggle(item.id)}>
                                                                <i className="fas fa-check"></i>
                                                            </button>
                                                            <button className="btn-cancel" onClick={() => this.cancelUpdate(item.id)}>
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        </td>
                                                        : <td></td>
                                                    }
                                                </tr>
                                            )
                                        }
                                    })
                                    : null
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="8">
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataUser: state.user.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Booking)