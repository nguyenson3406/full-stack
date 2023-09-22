import React, { Component } from "react";
import { toast } from 'react-toastify';
import Logo from '../../../../assets/images/logo/logo.svg'
import MarkDown from "../../../../components/MarkDown/MarkDown";
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handNewClinicApi } from "../../../../services/clinicServices"

class CreateClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            provinceId: '',
            address: '',
            image: '',
            Markdown: '',
            description: '',
        }
    }

    componentDidMount() {
        this.reset()
    }

    reset = () => {
        let reset = {
            name: '',
            provinceId: '',
            address: '',
            image: '',
            Markdown: '',
            description: '',
        }
        this.setState({
            ...reset
        })
        this.props.ClearMarkdown()
    }

    handleOnChange = (event, id) => {
        let dataCopy = this.state
        dataCopy[id] = event.target.value
        this.setState({
            ...dataCopy
        })
    }

    handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await this.convertBase64(file)
        this.setState({
            image: base64,
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

    validateNewClinic = () => {
        let data = this.state
        let arrInput = ['name', 'address', 'description']
        for (var i = 0; i < arrInput.length; i++) {
            if (!data[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        data.Markdown = this.props.dataMarkdown
        this.createClinic(data)
    }

    createClinic = async (data) => {
        try {
            let res = await handNewClinicApi(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                toast.success(`Create new clinic success`, {
                    className: 'toast-message'
                })
                this.backList()
            }
        } catch (e) {
            console.log(e)
        }
    }

    backList = () => {
        this.props.history.push(`/admin/catalog/clinic`)
    }

    render() {
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="Create-content col-11">
                        <div className="back-list">
                            <span onClick={() => this.backList()}>
                                <i className="fas fa-arrow-left"></i>
                                <span>Back</span>
                            </span>
                        </div>
                        <p className="title">Create new Clinic</p>
                        <div className="CreateForm">
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <div className="avatar">
                                        <label htmlFor="CreateUpload"><img src={this.state.image ? this.state.image : Logo} /></label>
                                        <input id="CreateUpload" type="file" name="imageUpload" onChange={(event) => this.handleFileRead(event)} hidden />
                                    </div>
                                </div>
                                <div className="row col-md-9">
                                    <div className="form-group col-md-12">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name="name" placeholder="Name"
                                            onChange={(event) => this.handleOnChange(event, 'name')}
                                            value={this.state.name || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-8">
                                        <label>Address</label>
                                        <input type="text" className="form-control" name="address" placeholder="Address"
                                            onChange={(event) => this.handleOnChange(event, 'address')}
                                            value={this.state.address || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Province</label>
                                        <select name="provinceId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'provinceId')}
                                            value={this.state.provinceId || ''}>
                                            <option hidden value=''>Choose...</option>
                                            <option value='PRO1'>Ha Noi</option>
                                            <option value='PRO2'>Ho Chi Minh</option>
                                            <option value='PRO3'>Da Nang</option>
                                            <option value='PRO4'>Can Tho</option>
                                            <option value='PRO5'>Binh Duong</option>
                                            <option value='PRO6'>Dong Nai</option>
                                            <option value='PRO7'>Quang Ninh</option>
                                            <option value='PRO8'>Hue</option>
                                            <option value='PRO9'>Quang Binh</option>
                                            <option value='PRO10'>Khanh Hoa</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Description</label>
                                        <textarea name="description" className="form-control"
                                            onChange={(event) => this.handleOnChange(event, 'description')}
                                            value={this.state.description || ''}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MarkDown urlUpdate={`http://localhost:8080/api/catalogDoctor/uploadFile`}></MarkDown>
                        <div className="btn-controll">
                            <button className="btn btn-primary" onClick={() => this.validateNewClinic()}>
                                Add New
                            </button>
                            <button className="btn btn-secondary" onClick={() => this.backList()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataMarkdown: state.markdown.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ClearMarkdown: () => dispatch(actions.ClearMarkdown())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateClinic))