import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { handVerifyBookingApi } from "../../services/pageServices"
import { toast } from 'react-toastify';

class VerifyBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = async () => {
        await this.handVerifyBooking()
    }

    handVerifyBooking = async () => {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            let data = {
                token: token,
                doctorId: doctorId
            }
            try {
                let res = await handVerifyBookingApi(data)
                if (res && res.data.errCode !== 0) {
                    toast.error(res.data.message, {
                        className: 'toast-message'
                    })
                } else {
                    toast.success(`Your booking success`, {
                        className: 'toast-message'
                    })
                    this.props.handToggle()
                }
                this.props.history.push(`/doctor-infor/${doctorId}`)
            } catch (e) {
                console.log(e)
            }
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default withRouter(VerifyBooking)