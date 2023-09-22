import React, { Component } from "react";
import './ServicesSpecialty.scss'
import { Link } from "react-router-dom";
import Logo from '../../assets/images/logo/logo.svg'
import Slider from "react-slick";
import { handGetListSpecialtyApi } from '../../services/pageServices'
import { withRouter } from "react-router-dom";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class ServicesSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyList: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetSpecialty()
    }

    componentDidUpdate = async (prevProps) => {
        let id = this.props.match.params.id
        let prevId = prevProps.match.params.id
        if (id !== prevId) {
            await this.handGetSpecialty()
        }
    }

    handGetSpecialty = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await handGetListSpecialtyApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                specialtyList: isRes ? res.data.data : {}
            })
        }
    }

    render() {
        let { settings } = this.props
        let { specialtyList } = this.state
        return (
            <div className="ServicesSpecialty-container">
                <div className="ServicesSpecialty-content">
                    <div className="title-content row col-12">
                        <span className="col-5">{i18next.t("services.title-2")}</span>
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

export default withTranslation()(withRouter(ServicesSpecialty))