import React, { Component } from "react";
import './Contact.scss'

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <div className="title-content">
                    <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
                </div>
                <div className="body-content">
                    <p><i className="fas fa-envelope"></i>support@testbooking.com</p>
                    <p><i className="fas fa-phone"></i>1-800-123-4560</p>
                    <p><i className="fas fa-map-marker-alt"></i>Số 01, TestBooking, Phường 15, Quận 10, TestBooking</p>
                </div>
            </div>
        )
    }
}

export default Contact