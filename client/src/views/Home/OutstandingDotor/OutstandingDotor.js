import React, { Component } from "react";
import './OutstandingDotor.scss'
import { Link } from "react-router-dom";
import img from "../../../routes/img"
import Slider from "react-slick";
import test from "../../../assets/images/cold.png"

class OutstandingDotor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { settings } = this.props
        return (
            <div className="OutstandingDotor-container">
                <div className="OutstandingDotor-content">
                    <div className="title-content row col-12">
                        <span className="col-5">Bác sĩ nổi bật</span>
                        <div className="more-container col-2">
                            <Link className="more" to='/todo'>
                                Tat ca bac si
                            </Link>
                        </div>
                    </div>
                    <div className="slide-content">
                        <Slider className="col-12" {...settings}>
                            <div>
                                <Link className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 1</p>
                                    <p className="description">
                                        Description test booking 1
                                    </p>
                                </Link>
                            </div>
                            <div>
                                <Link className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 2</p>
                                    <p className="description">
                                        Description test booking 1
                                    </p>
                                </Link>
                            </div>
                            <div>
                                <Link className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 3</p>
                                    <p className="description">
                                        Description test booking 1
                                    </p>
                                </Link>
                            </div>
                            <div>
                                <Link className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 4</p>
                                    <p className="description">
                                        Description test booking 1
                                    </p>
                                </Link>
                            </div>
                            <div>
                                <Link className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 5</p>
                                    <p className="description">
                                        Description test booking 1
                                    </p>
                                </Link>
                            </div>
                            <div>
                                <Link className="select" to='/todo'>
                                    <img src={test} />
                                    <p className="title">Test booking 6</p>
                                    <p className="description">
                                        Description test booking 1
                                    </p>
                                </Link>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

export default OutstandingDotor