import React, { Component } from "react";
import './Blog.scss'
import { Link } from "react-router-dom";
import Logo from '../../../assets/images/logo/logo.svg'
import Slider from "react-slick";
import { handGetBlogApi } from "../../../services/pageServices"
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogList: ''
        }
    }

    componentDidMount = async () => {
        await this.handGetBlog()
    }

    handGetBlog = async () => {
        let res = await handGetBlogApi()
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            blogList: isRes ? res.data.data : {}
        })
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };
        let { blogList } = this.state
        return (
            <div className="Blog-container">
                <div className="Blog-content">
                    <div className="title-content row col-12">
                        <span className="col-5">{i18next.t("home.blog.title")}</span>
                        <div className="more-container col-2">
                            <Link className="more" to='/blog'>
                                {i18next.t("home.blog.more")}
                            </Link>
                        </div>
                    </div>
                    <div className="slide-content">
                        <Slider className="col-12" {...settings}>
                            {blogList && blogList.length > 0 ?
                                blogList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Link className="select" to={`/blog/${item.id}`}>
                                                <img src={item.image ? item.image : Logo} />
                                                <div className="text-content">
                                                    <p className="title">{item.name}</p>
                                                    <p className="description">
                                                        {item.Markdown.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                                : null
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Blog)