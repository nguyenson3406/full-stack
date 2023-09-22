import React, { Component } from "react";
import './ClinicInfo.scss'
import { handGetClinicApi } from "../../services/pageServices";
import { withRouter } from "react-router-dom";
import Background from '../../assets/images/banner-1.jpg'
import Logo from '../../assets/images/logo/logo.svg'

class ClinicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ClinicInfo: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetClinic()
    }

    handGetClinic = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await handGetClinicApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            this.setState({
                ClinicInfo: isRes ? res.data.data : {}
            })
        }
    }

    render() {
        let { ClinicInfo } = this.state
        console.log(ClinicInfo)
        return (
            <div className="ClinicInfo">
                <div className="ClinicInfo-header" style={ClinicInfo.image ? { backgroundImage: `url(${ClinicInfo.image})` }
                    : { backgroundImage: `url(${Background})` }}>
                    <div className="header-top"></div>
                    <div className="header-content row col-12">
                        <div className="header-img col-2">
                            <img src={ClinicInfo.image ? ClinicInfo.image : Logo} />
                        </div>
                        <div className="header-info col-10">
                            <p>{ClinicInfo.name}</p>
                            <div className="address">
                                <span>{ClinicInfo.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {ClinicInfo.Markdown && ClinicInfo.Markdown.contentMarkdown &&
                    <div className="ClinicInfo-body"
                        dangerouslySetInnerHTML={{ __html: ClinicInfo.Markdown.contentMarkdown }}>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(ClinicInfo)