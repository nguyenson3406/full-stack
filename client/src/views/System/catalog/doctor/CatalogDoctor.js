import React, { Component } from "react";
import { handGetDoctorApi, handShowDoctor, handDeleteDoctorApi } from "../../../../services/catalogDoctorServices"
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table from "../Table";

class CatalogDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            listDoctor: '',
            filterKey: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctorData()
    }

    handGetDoctorData = async () => {
        let res = await handGetDoctorApi();
        let isRes = res && res.data && res.data.errCode === 0
        let data = isRes ? res.data.user : {}
        if (data && data.length) {
            data.map((item, index) => {
                data[index].idList = index + 1
                data[index].show = item.Doctor_Infor.show
            })
        }
        this.setState({
            listDoctor: isRes ? res.data.user : {},
        })
    }

    newDoctor = () => {
        this.props.history.push(`/admin/catalog/doctor/new`)
    }

    editDoctor = (id) => {
        this.props.history.push(`/admin/catalog/doctor/edit/${id}`)
    }

    deleteDoctor = async (doctorId) => {
        try {
            let res = await handDeleteDoctorApi(doctorId);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetDoctorData();
                toast.success(`Delete success`, {
                    className: 'toast-message'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    showDoctor = async (doctorId) => {
        try {
            let data = {
                id: doctorId,
                show: !this.state.listDoctor.find(item => item.id === doctorId).Doctor_Infor.show
            }
            let res = await handShowDoctor(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetDoctorData();
                toast.success(`Change success`, {
                    className: 'toast-message'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    setFilter = (event) => {
        this.setState({
            filterKey: event.target.value
        })
    }

    render() {
        let { listDoctor, filterKey } = this.state;
        let arrValue = ['id', 'email', 'firstName', 'lastName', 'address']
        let arrLabel = ['ID', 'Email', 'First Name', 'Last Name', 'Address']
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="List-content col-11">
                        <p className="title">Doctor List</p>
                        <button className="btn-add-new btn btn-primary mb-3" onClick={() => this.newDoctor()}>
                            <i className="fas fa-plus"></i> Add New User
                        </button>
                        <div className="search-content col-3 form-group row">
                            <i className="fas fa-search"></i>
                            <input type="text" className="form-control" placeholder="Tim kiem"
                                onChange={(event) => this.setFilter(event)} value={filterKey}
                            />
                        </div>
                        <Table listData={listDoctor} arrValue={arrValue} arrLabel={arrLabel}
                            filterKey={filterKey} show={(event) => this.showDoctor(event)}
                            edit={(event) => this.editDoctor(event)}
                            delete={(event) => this.deleteDoctor(event)}></Table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        MarkdownData: (data) => dispatch(actions.MarkdownData(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogDoctor))