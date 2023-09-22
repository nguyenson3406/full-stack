import React, { Component } from "react";
import { handGetClinicApi, handShowClinic, handDeleteClinicApi } from "../../../../services/clinicServices"
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table from "../Table";

class CatalogClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            listClinic: '',
            filterKey: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetClinicData()
    }

    handGetClinicData = async () => {
        let res = await handGetClinicApi();
        let isRes = res && res.data && res.data.errCode === 0
        let data = isRes ? res.data.clinic : {}
        if (data && data.length) {
            data.map((item, index) => {
                data[index].idList = index + 1
            })
        }
        this.setState({
            listClinic: isRes ? res.data.clinic : {},
        })
    }

    newClinic = () => {
        this.props.history.push(`/admin/catalog/clinic/new`)
    }

    editClinic = (id) => {
        this.props.history.push(`/admin/catalog/clinic/edit/${id}`)
    }

    deleteClinic = async (clinicId) => {
        try {
            let res = await handDeleteClinicApi(clinicId);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetClinicData();
                toast.success(`Delete success`, {
                    className: 'toast-message'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    showClinic = async (clinicId) => {
        try {
            let data = {
                id: clinicId,
                show: !this.state.listClinic.find(item => item.id === clinicId).show
            }
            let res = await handShowClinic(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetClinicData();
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
        let { listClinic, filterKey } = this.state;
        let arrValue = ['id', 'name', 'address']
        let arrLabel = ['ID', 'Name', 'Address']
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="List-content col-11">
                        <p className="title">Clinic List</p>
                        <button className="btn-add-new btn btn-primary mb-3" onClick={() => this.newClinic()}>
                            <i className="fas fa-plus"></i> Add New Clinic
                        </button>
                        <div className="search-content col-3 form-group row">
                            <i className="fas fa-search"></i>
                            <input type="text" className="form-control" placeholder="Tim kiem"
                                onChange={(event) => this.setFilter(event)} value={filterKey}
                            />
                        </div>
                        <Table listData={listClinic} arrValue={arrValue} arrLabel={arrLabel}
                            filterKey={filterKey} show={(event) => this.showClinic(event)}
                            edit={(event) => this.editClinic(event)}
                            delete={(event) => this.deleteClinic(event)}></Table>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogClinic))