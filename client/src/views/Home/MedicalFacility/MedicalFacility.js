import React, { Component } from "react";
import './MedicalFacility.scss'
import { Link } from "react-router-dom";
import Logo from '../../../assets/images/logo/logo.svg'
import Slider from "react-slick";
import { handGetClinicApi } from "../../../services/pageServices"
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicList: ''
        }
    }

    componentDidMount = async () => {
        await this.handGetClinic()
    }

    handGetClinic = async () => {
        let res = await handGetClinicApi()
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            clinicList: isRes ? res.data.data : {}
        })
    }

    render() {
        let { settings } = this.props
        let { clinicList } = this.state
        return (
            <div className="MedicalFacility-container">
                <div className="MedicalFacility-content">
                    <div className="title-content row col-12">
                        <span className="col-5">{i18next.t("home.medicalFacility")}</span>
                        <div className="more-container col-2">
                            <Link className="more" to='/clinic'>
                                {i18next.t("home.more")}
                            </Link>
                        </div>
                    </div>
                    <div className="slide-content">
                        <Slider className="col-12" {...settings}>
                            {clinicList && clinicList.length > 0 ?
                                clinicList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <Link className="select" to={`/clinic/${item.id}`}>
                                                <img src={item.image ? item.image : Logo} />
                                                <p className="title">{item.name}</p>
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

export default withTranslation()(MedicalFacility)