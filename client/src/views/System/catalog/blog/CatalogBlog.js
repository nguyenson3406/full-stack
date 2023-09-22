import React, { Component } from "react";
import { handGetBlogApi, handShowBlog, handDeleteBlogApi } from "../../../../services/blogServices"
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table from "../Table";

class CatalogBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            listBlog: '',
            filterKey: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetBlogData()
    }

    handGetBlogData = async () => {
        let res = await handGetBlogApi();
        let isRes = res && res.data && res.data.errCode === 0
        let data = isRes ? res.data.blog : {}
        if (data && data.length) {
            data.map((item, index) => {
                data[index].idList = index + 1
            })
        }
        this.setState({
            listBlog: isRes ? res.data.blog : {},
        })
    }

    newBlog = () => {
        this.props.history.push(`/admin/catalog/blog/new`)
    }

    editBlog = (id) => {
        this.props.history.push(`/admin/catalog/blog/edit/${id}`)
    }

    deleteBlog = async (BlogId) => {
        try {
            let res = await handDeleteBlogApi(BlogId);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetBlogData();
                toast.success(`Delete success`, {
                    className: 'toast-message'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    showBlog = async (blogId) => {
        try {
            let data = {
                id: blogId,
                show: !this.state.listBlog.find(item => item.id === blogId).show
            }
            let res = await handShowBlog(data);
            if (res && res.data.errCode !== 0) {
                toast.error(res.data.message, {
                    className: 'toast-message'
                })
            } else {
                await this.handGetBlogData();
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
        let { listBlog, filterKey } = this.state;
        let arrValue = ['id', 'name', 'author']
        let arrLabel = ['ID', 'Name', 'Author']
        return (
            <div className="List-background col-12">
                <div className="List-container col-12">
                    <div className="List-content col-11">
                        <p className="title">Blog List</p>
                        <button className="btn-add-new btn btn-primary mb-3" onClick={() => this.newBlog()}>
                            <i className="fas fa-plus"></i> Add New Blog
                        </button>
                        <div className="search-content col-3 form-group row">
                            <i className="fas fa-search"></i>
                            <input type="text" className="form-control" placeholder="Tim kiem"
                                onChange={(event) => this.setFilter(event)} value={filterKey}
                            />
                        </div>
                        <Table listData={listBlog} arrValue={arrValue} arrLabel={arrLabel}
                            filterKey={filterKey} show={(event) => this.showBlog(event)}
                            edit={(event) => this.editBlog(event)}
                            delete={(event) => this.deleteBlog(event)}></Table>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogBlog))