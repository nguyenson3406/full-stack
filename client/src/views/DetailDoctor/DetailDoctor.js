import React, { Component } from "react";
import './DetailDoctor.scss'
import { withRouter } from "react-router-dom";
import { handGetDoctorDeltailApi } from "../../services/pageServices"
import Schedule from "./Schedule";
import DoctorDescription from "./DoctorDescription";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: '',
        }
    }

    componentDidMount = async () => {
        await this.handGetDoctor()
    }

    handGetDoctor = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await handGetDoctorDeltailApi(id)
            let isRes = res && res.data && res.data.errCode === 0
            if (isRes) {
                this.setState({
                    detailDoctor: isRes ? res.data.data : {}
                })
            } else {
                this.props.history.push(`/404`)
            }
        }
    }

    render() {
        let { detailDoctor } = this.state
        return (
            <div className="DetailDoctor-container">
                <div className="DetailDoctor-content col-11">
                    <div className="DetailDoctor-top">
                        <DoctorDescription id={this.props.match.params.id} isSpecialty={false}></DoctorDescription>
                        <Schedule id={this.props.match.params.id}></Schedule>
                    </div>
                    {detailDoctor.Markdown && detailDoctor.Markdown.contentMarkdown &&
                        <div className="DetailDoctor-body"
                            dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentMarkdown }}>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(DetailDoctor)