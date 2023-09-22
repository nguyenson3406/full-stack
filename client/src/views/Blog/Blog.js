import React, { Component } from "react";
import './Blog.scss';
import { handGetAllBlogApi } from "../../services/pageServices";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/logo/logo.svg';
import moment from 'moment/dist/moment';
import Background from '../../assets/images/banner-1.jpg';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BlogList: '',
            maxBlog: 10,
        }
    }

    componentDidMount = async () => {
        await this.handGetBlog()
    }

    handGetBlog = async () => {
        let res = await handGetAllBlogApi()
        let data = res && res.data && res.data.errCode === 0 ? res.data.data : {}
        if (data && data.length > 0) {
            data.map((item, index) => {
                data[index].date = moment(item.updatedAt).format('DD/MM/YYYY')
            })
        }
        this.setState({
            BlogList: data
        })
    }

    getMoreBlog = () => {
        let { maxBlog } = this.state
        this.setState({
            maxBlog: maxBlog + 5
        })
    }

    render() {
        let { maxBlog, BlogList } = this.state
        return (
            <div className="BlogPage-container">
                <div className="BlogPage-background col-11" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="background-content">
                        <p>{i18next.t("blog.background")}</p>
                    </div>
                </div>
                <div className="Blog-Link col-9 row">
                    <div className="Title-Link">
                        <p>{i18next.t("blog.title")}</p>
                    </div>
                    {BlogList && BlogList.length > 0 ?
                        BlogList.map((item, index) => {
                            if (maxBlog >= index) {
                                return (
                                    <div className="Link-content col-12" key={index}>
                                        <Link className="select" to={`/blog/${item.id}`}>
                                            <div className="row">
                                                <div className="img-blog col-4">
                                                    <img src={item.image ? item.image : Logo} />
                                                </div>
                                                <div className="text-content col-8">
                                                    <p className="title">{item.name}</p>
                                                    <p className="more-info">
                                                        <span className="author">
                                                            <i className="fas fa-user-circle"></i>
                                                            <span>{item.author}</span>
                                                        </span>
                                                        <i className="dot fas fa-circle"></i>
                                                        <span>{item.date}</span>
                                                    </p>
                                                    <p className="description">
                                                        {item.Markdown.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }
                        })
                        : null}
                    {maxBlog < BlogList.length ?
                        <div className="more-blog col-3" onClick={() => this.getMoreBlog()}>
                            <span>{i18next.t("blog.more")}</span>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default withTranslation()(Blog)