import React, { Component } from "react";
import './Specialty.scss'
import { NavLink } from "react-router-dom";
import img from "../../../routes/img"
import Slider from "react-slick";
import test from "../../../assets/images/cold.png"

class Specialty extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { settings } = this.props
        return (
            <div className="Specialty-container">
                <div className="Specialty-content">
                    <div className="title-content row col-12">
                        <span className="col-5">Chuyên khoa phổ biến</span>
                        <div className="more-container col-2">
                            <NavLink className="more" to='/todo'>
                                Xem them
                            </NavLink>
                        </div>
                    </div>
                    <div className="slide-content">
                        <Slider className="col-12" {...settings}>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 1</p>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 2</p>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 3</p>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 4</p>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 5</p>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 6</p>
                                </NavLink>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

export default Specialty