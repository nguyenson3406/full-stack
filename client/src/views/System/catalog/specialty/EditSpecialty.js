import React, { Component } from "react";
import { toast } from 'react-toastify';
import Logo from '../../../../assets/images/logo/logo.svg'
import MarkDown from "../../../../components/MarkDown/MarkDown";
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handGetSpecialtyApi, handUpdateSpecialtyApi } from "../../../../services/specialtyServices"

class EditSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            image: '',
            servicesId: '',
        }

    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            await this.handGetSpecialtyData(id)
        }
    }

    handGetSpecialtyData = async (specialtyId) => {
        let res = await handGetSpecialtyApi(specialtyId);
        let data = res && res.data && res.data.errCode === 0 ? res.data.specialty : {};
        if (data) {
            this.setState({
                id: data.id,
                name: data.name,
                servicesId: data.servicesId,
                image: data.image,
                description: data.description,
            })
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

    validateEditSpecialty = () => {
        let data = this.state
        let arrInput = ['name', 'servicesId', 'description']
        for (var i = 0; i < arrInput.length; i++) {
            if (!data[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        this.updateSpecialty(data)
    }

    updateSpecialty = async (data) => {
        try {
            let res = await handUpdateSpecialtyApi(data);
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
        this.props.history.push(`/admin/catalog/specialty`)
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
                        <p className="title">Edit Specialty</p>
                        <div className="EditForm">
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <div className="avatar">
                                        <label htmlFor="CreateUpload"><img src={this.state.image ? this.state.image : Logo} /></label>
                                        <input id="CreateUpload" type="file" name="imageUpload" onChange={(event) => this.handleFileRead(event)} hidden />
                                    </div>
                                </div>
                                <div className="row col-md-9">
                                    <div className="form-group col-md-8">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name="name" placeholder="Name"
                                            onChange={(event) => this.handleOnChange(event, 'name')}
                                            value={this.state.name || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Services</label>
                                        <select name="servicesId" className="form-select"
                                            onChange={(event) => this.handleOnChange(event, 'servicesId')}
                                            value={this.state.servicesId || ''}>
                                            <option hidden value=''>Choose...</option>
                                            <option value='ST1'>Specialist examination</option>
                                            <option value='ST2'>Remote consultation</option>
                                            <option value='ST3'>General examination</option>
                                            <option value='ST4'>Medical test</option>
                                            <option value='ST5'>Mental health</option>
                                            <option value='ST6'>Dental examination</option>
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
                        <div className="btn-controll">
                            <button className="btn btn-primary" onClick={() => this.validateEditSpecialty()}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditSpecialty))