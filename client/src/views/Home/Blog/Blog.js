import React, { Component } from "react";
import './Blog.scss'
import { NavLink } from "react-router-dom";
import img from "../../../routes/img"
import Slider from "react-slick";
import test from "../../../assets/images/cold.png"

class Blog extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };
        return (
            <div className="Blog-container">
                <div className="Blog-content">
                    <div className="title-content row col-12">
                        <span className="col-5">Cẩm nang</span>
                        <div className="more-container col-2">
                            <NavLink className="more" to='/todo'>
                                Tat ca bai viet
                            </NavLink>
                        </div>
                    </div>
                    <div className="slide-content">
                        <Slider className="col-12" {...settings}>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <div className="text-content">
                                        <p className="title">Test booking 1</p>
                                        <p className="description">
                                            Description test booking 1
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <div className="text-content">
                                        <p className="title">Test booking 2</p>
                                        <p className="description">
                                            Description test booking 2
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <div className="text-content">
                                        <p className="title">Test booking 3</p>
                                        <p className="description">
                                            Description test booking 3
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <div className="text-content">
                                        <p className="title">Test booking 4</p>
                                        <p className="description">
                                            Description test booking 4
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <div className="text-content">
                                        <p className="title">Test booking 5</p>
                                        <p className="description">
                                            Description test booking 5
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <div className="text-content">
                                        <p className="title">Test booking 6</p>
                                        <p className="description">
                                            Description test booking 6
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

export default Blog