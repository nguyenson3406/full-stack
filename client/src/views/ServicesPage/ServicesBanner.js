import React, { Component } from "react";
import './ServicesBanner.scss'
import { handGetAllcodeApi } from "../../services/pageServices";
import { withRouter } from "react-router-dom";
import Background from '../../assets/images/banner-1.jpg'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class ServicesBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ServicesBanner: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetSpecialty()
    }

    handGetSpecialty = async () => {
        let res = await handGetAllcodeApi('SERVICES')
        let isRes = res && res.data && res.data.errCode === 0
        this.setState({
            ServicesBanner: isRes ? res.data.allcode : {}
        })
    }

    render() {
        let { ServicesBanner } = this.state
        let id = this.props.match.params.id
        let value = this.props.Language.includes("en") ? "value_en" : "value_vi"
        return (
            <div className="ServicesBanner"
                style={{ backgroundImage: `url(${Background})` }}>
                <div className="ServicesBanner-container">
                    <div className="ServicesBanner-content">
                        {ServicesBanner && ServicesBanner.length > 0 ?
                            ServicesBanner.map((item, index) => {
                                if (item.key_map === id) {
                                    return (
                                        <p key={index}>{item[value]}</p>
                                    )
                                }
                            })
                            : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Language: state.language.Language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (lang) => dispatch(actions.changeLanguage(lang))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ServicesBanner))