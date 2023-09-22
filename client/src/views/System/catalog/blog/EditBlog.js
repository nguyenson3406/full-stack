import React, { Component } from "react";
import { toast } from 'react-toastify';
import Logo from '../../../../assets/images/logo/logo.svg'
import MarkDown from "../../../../components/MarkDown/MarkDown";
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handGetBlogApi, handUpdateBlogApi } from "../../../../services/blogServices"

class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            author: '',
            image: '',
            Markdown: '',
            description: '',
        }

    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            await this.handGetBlogData(id)
        }
    }

    handGetBlogData = async (blogId) => {
        let res = await handGetBlogApi(blogId);
        let data = res && res.data && res.data.errCode === 0 ? res.data.blog : {};
        if (data) {
            this.setState({
                id: data.id,
                name: data.name,
                author: data.author,
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

    validateEditBlog = () => {
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
        this.updateBlog(data)
    }

    updateBlog = async (data) => {
        try {
            let res = await handUpdateBlogApi(data);
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
        this.props.history.push(`/admin/catalog/blog`)
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
                        <p className="title">Edit Blog</p>
                        <div className="EditForm">
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
                            <button className="btn btn-primary" onClick={() => this.validateEditBlog()}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBlog))