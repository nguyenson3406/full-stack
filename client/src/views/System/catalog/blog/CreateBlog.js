import React, { Component } from "react";
import { toast } from 'react-toastify';
import MarkDown from "../../../../components/MarkDown/MarkDown";
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handNewBlogApi } from "../../../../services/blogServices"
import Logo from '../../../../assets/images/logo/logo.svg'

class CreateBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            author: '',
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
            author: '',
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

    validateNewBlog = () => {
        let data = this.state
        let arrInput = ['name', 'author', 'description']
        for (var i = 0; i < arrInput.length; i++) {
            if (!data[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        data.Markdown = this.props.dataMarkdown
        this.createBlog(data)
    }

    createBlog = async (data) => {
        try {
            let res = await handNewBlogApi(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                toast.success(`Create new blog success`, {
                    className: 'toast-message'
                })
                this.backList()
            }
        } catch (e) {
            console.log(e)
        }
    }

    backList = () => {
        this.props.history.push(`/admin/catalog/blog`)
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
                        <p className="title">Create new Blog</p>
                        <div className="CreateForm">
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <div className="avatar">
                                        <label htmlFor="CreateUpload"><img src={this.state.image ? this.state.image : Logo} /></label>
                                        <input id="CreateUpload" type="file" name="imageUpload" onChange={(event) => this.handleFileRead(event)} hidden />
                                    </div>
                                </div>
                                <div className="row col-md-9">
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input type="text" className="form-control" name="name" placeholder="Name"
                                            onChange={(event) => this.handleOnChange(event, 'name')}
                                            value={this.state.name || ''}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Author</label>
                                        <input type="text" className="form-control" name="author" placeholder="Author"
                                            onChange={(event) => this.handleOnChange(event, 'author')}
                                            value={this.state.author || ''}
                                        />
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
                            <button className="btn btn-primary" onClick={() => this.validateNewBlog()}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateBlog))