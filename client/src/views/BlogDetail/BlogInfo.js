import React, { Component } from "react";
import './BlogInfo.scss'
import { handGetBlogApi, handGetAllBlogApi } from "../../services/pageServices";
import { withRouter } from "react-router-dom";
import Background from '../../assets/images/banner-1.jpg'
import Logo from '../../assets/images/logo/logo.svg'
import moment from 'moment/dist/moment';
import { Link } from "react-router-dom";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class BlogInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BlogInfo: '',
            BlogList: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetBlog()
    }

    componentDidUpdate = async (prevProps) => {
        let id = this.props.match.params.id
        let prevId = prevProps.match.params.id
        if (id !== prevId) {
            await this.handGetBlog()
        }
    }

    handGetBlog = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await handGetBlogApi(id)
            let data = res && res.data && res.data.errCode === 0 ? res.data.data : {}
            data.date = moment(data.updatedAt).format('DD/MM/YYYY')
            this.setState({
                BlogInfo: data
            })
            await this.handGetAllBlog(id)
        }
    }

    handGetAllBlog = async (id) => {
        let res = await handGetAllBlogApi(id)
        let data = res && res.data && res.data.errCode === 0 ? res.data.data : {}
        this.setState({
            BlogList: data
        })
    }

    render() {
        let { BlogInfo, BlogList } = this.state
        console.log((BlogList))
        return (
            <div className="BlogInfo">
                <div className="BlogInfo-header" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="header-content">
                        <p>{BlogInfo.name}</p>
                    </div>
                </div>
                <div className="BlogInfo-body col-11">
                    <div className="body-top row col-12">
                        <div className="top-info">
                            <p className="name">{BlogInfo.name}</p>
                            <div className="author">
                                <span className="title">{i18next.t("blogDetail.author")} </span>
                                <span>{BlogInfo.author}</span>
                            </div>
                            <div className="date">
                                <span className="title">{i18next.t("blogDetail.date")} </span>
                                <span>{BlogInfo.date}</span>
                            </div>
                        </div>
                        <div className="top-img">
                            <img src={BlogInfo.image ? BlogInfo.image : Logo} />
                        </div>
                    </div>
                    {BlogInfo.Markdown && BlogInfo.Markdown.contentMarkdown &&
                        <div className="body-content"
                            dangerouslySetInnerHTML={{ __html: BlogInfo.Markdown.contentMarkdown }}>
                        </div>
                    }
                </div>
                <div className="BlogInfo-footer row">
                    <div className="link col-6">
                        <Link className={BlogList.prevBlog ? "select" : "select disabled"} to={`/blog/${BlogList.prevBlog}`}>
                            <span className="title">
                                <i className="fas fa-chevron-left"> </i>
                                <span>{i18next.t("blogDetail.previous")}</span>
                            </span>
                        </Link>
                    </div>
                    <div className="link col-6">
                        <Link className={BlogList.nextBlog ? "select" : "select disabled"} to={`/blog/${BlogList.nextBlog}`}>
                            <span className="title">
                                <span>{i18next.t("blogDetail.next")}</span>
                                <i className="fas fa-chevron-right"> </i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(BlogInfo))