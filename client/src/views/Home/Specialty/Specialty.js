import React, { Component } from "react";
import './Specialty.scss'
import { Link } from "react-router-dom";
import Logo from '../../../assets/images/logo/logo.svg'
import Slider from "react-slick";
import { handGetListSpecialtyApi } from '../../../services/pageServices'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyList: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetSpecialty()
    }

    handGetSpecialty = async () => {
        let res = await handGetListSpecialtyApi()
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            specialtyList: isRes ? res.data.data : {}
        })
    }

    render() {
        let { settings } = this.props
        let { specialtyList } = this.state
        return (
            <div className="Specialty-container">
                <div className="Specialty-content">
                    <div className="title-content row col-12">
                        <span className="col-5">{i18next.t("home.specialty")}</span>
                        <div className="more-container col-2">
                            <Link className="more" to='/services/ST1'>
                                {i18next.t("home.more")}
                            </Link>
                        </div>
                    </div>
                    <div className="slide-content">
                        <Slider className="col-12" {...settings}>
                            {specialtyList && specialtyList.length > 0 ?
                                specialtyList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Link className="select" to={`/specialty/${item.id}`}>
                                                <img src={item.image ? item.image : Logo} />
                                                <p className="title">{item.name}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                                : null}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Specialty)