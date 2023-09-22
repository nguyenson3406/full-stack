import React, { Component } from "react";
import './SpecialtyInfo.scss'
import { handGetSpecialtyInfoApi } from "../../services/pageServices";
import { withRouter } from "react-router-dom";
import Background from '../../assets/images/banner-1.jpg'

class SpecialtyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyInfo: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetSpecialty()
    }

    handGetSpecialty = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await handGetSpecialtyInfoApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                specialtyInfo: isRes ? res.data.data : {}
            })
        }
    }

    render() {
        let { specialtyInfo } = this.state
        return (
            <div className="SpecialtyInfo"
                style={specialtyInfo.image ? { backgroundImage: `url(${specialtyInfo.image})` }
                    : { backgroundImage: `url(${Background})` }}>
                <div className="SpecialtyInfo-container">
                    <div className="SpecialtyInfo-content">
                        <p>{specialtyInfo.name}</p>
                        <div className="description">
                            <span>{specialtyInfo.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SpecialtyInfo)