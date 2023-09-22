import React, { Component } from "react";
import './BlogDetail.scss'
import BlogInfo from "./BlogInfo";

class BlogDetail extends Component {
    render() {
        return (
            <div className="BlogDetail">
                <div className="col-11 Info-content">
                    <BlogInfo></BlogInfo>
                </div>
            </div>
        )
    }
}

export default BlogDetail