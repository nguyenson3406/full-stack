import React, { Component } from "react";
import './HomeHeader.scss'
import { Link } from "react-router-dom";
import img from "../../../routes/img"

class HomeHeadder extends Component {
    render() {
        return (
            <div className="Home-header">
                <div className="title-content">
                    <h1>Nền tảng y tế <br></br>chăm sóc sức khỏe toàn diện</h1>
                </div>
                <div className="select-content  col-12">
                    <div className="row col-9">
                        <div className="col-2">
                            <Link className="select" to='/todo'>
                                <div className="img-content"><img src={img.Specialty} /></div>
                                <span>Kham Chuyen Khoa</span>
                            </Link>
                        </div>
                        <div className="col-2">
                            <Link className="select" to='/todo'>
                                <div className="img-content"><img src={img.tuXa} /></div>
                                <span>Kham Tu Xa</span>
                            </Link>
                        </div>
                        <div className="col-2">
                            <Link className="select" to='/todo'>
                                <div className="img-content"><img src={img.tongQuat} /></div>
                                <span>Kham Tong Quat</span>
                            </Link>
                        </div>
                        <div className="col-2">
                            <Link className="select" to='/todo'>
                                <div className="img-content"><img src={img.xetNghiem} /></div>
                                <span>Xet Nghiem Y Hoc</span>
                            </Link>
                        </div>
                        <div className="col-2">
                            <Link className="select" to='/todo'>
                                <div className="img-content"><img src={img.tinhThan} /></div>
                                <span>Suc Khoe Tinh Than</span>
                            </Link>
                        </div>
                        <div className="col-2">
                            <Link className="select" to='/todo'>
                                <div className="img-content"><img src={img.nhaKhoa} /></div>
                                <span>Kham Nha Khoa</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeHeadder