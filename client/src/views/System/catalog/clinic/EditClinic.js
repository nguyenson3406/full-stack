import React, { Component } from "react";
import { toast } from 'react-toastify';
import Logo from '../../../../assets/images/logo/logo.svg'
import MarkDown from "../../../../components/MarkDown/MarkDown";
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handGetClinicApi, handUpdateClinicApi } from "../../../../services/clinicServices"

class EditClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provinceId: '',
            address: '',
            image: '',
            Markdown: '',
            description: '',
        }

    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            await this.handGetClinicData(id)
        }
    }

    handGetClinicData = async (clinicId) => {
        let res = await handGetClinicApi(clinicId);
        let data = res && res.data && res.data.errCode === 0 ? res.data.clinic : {};
        if (data) {
            this.setState({
                id: data.id,
                name: data.name,
                provinceId: data.provinceId,
                address: data.address,
                image: data.image,
                Markdown: data.Markdown.contentMarkdown,
                description: data.Markdown.description,
            })
            this.props.MarkdownData(data.Markdown.contentMarkdown)
        }
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
            image: base64
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

    validateEditClinic = () => {
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
        this.updateClinic(data)
    }

    updateClinic = async (data) => {
        try {
            let res = await handUpdateClinicApi(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                toast.success(`Change success`, {
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
                    <div className="Edit-content col-11">
                        <div className="back-list">
                            <span onClick={() => this.backList()}>
                                <i className="fas fa-arrow-left"></i>
                                <span>Back</span>
                            </span>
                        </div>
                        <p className="title">Edit Clinic</p>
                        <div className="EditForm">
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <div className="avatar">
                                        <label htmlFor="EditUpload"><img src={this.state.image ? this.state.image : Logo} /></label>
                                        <input id="EditUpload" type="file" name="imageUpload" onChange={(event) => this.handleFileRead(event)} hidden />
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
                            <button className="btn btn-primary" onClick={() => this.validateEditClinic()}>
                                Save
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
        MarkdownData: (data) => dispatch(actions.MarkdownData(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditClinic))