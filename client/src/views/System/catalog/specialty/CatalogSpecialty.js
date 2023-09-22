import React, { Component } from "react";
import { handGetSpecialtyApi, handShowSpecialty, handDeleteSpecialtyApi } from "../../../../services/specialtyServices"
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table from "../Table";

class CatalogSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            listSpecialty: '',
            filterKey: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetSpecialtyData()
    }

    handGetSpecialtyData = async () => {
        let res = await handGetSpecialtyApi();
        let isRes = res && res.data && res.data.errCode === 0
        let data = isRes ? res.data.specialty : {}
        if (data && data.length) {
            data.map((item, index) => {
                data[index].idList = index + 1
            })
        }
        this.setState({
            listSpecialty: isRes ? res.data.specialty : {},
        })
    }

    newSpecialty = () => {
        this.props.history.push(`/admin/catalog/specialty/new`)
    }

    editSpecialty = (id) => {
        this.props.history.push(`/admin/catalog/specialty/edit/${id}`)
    }

    deleteSpecialty = async (specialtyId) => {
        try {
            let res = await handDeleteSpecialtyApi(specialtyId);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetSpecialtyData();
                toast.success(`Delete success`, {
                    className: 'toast-message'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    showSpecialty = async (specialtyId) => {
        try {
            let data = {
                id: specialtyId,
                show: !this.state.listSpecialty.find(item => item.id === specialtyId).show
            }
            let res = await handShowSpecialty(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetSpecialtyData();
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
        let { listSpecialty, filterKey } = this.state;
        let arrValue = ['id', 'name']
        let arrLabel = ['ID', 'Name']
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="List-content col-11">
                        <p className="title">Specialty List</p>
                        <button className="btn-add-new btn btn-primary mb-3" onClick={() => this.newSpecialty()}>
                            <i className="fas fa-plus"></i> Add New Specialty
                        </button>
                        <div className="search-content col-3 form-group row">
                            <i className="fas fa-search"></i>
                            <input type="text" className="form-control" placeholder="Tim kiem"
                                onChange={(event) => this.setFilter(event)} value={filterKey}
                            />
                        </div>
                        <Table listData={listSpecialty} arrValue={arrValue} arrLabel={arrLabel}
                            filterKey={filterKey} show={(event) => this.showSpecialty(event)}
                            edit={(event) => this.editSpecialty(event)}
                            delete={(event) => this.deleteSpecialty(event)}></Table>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogSpecialty))