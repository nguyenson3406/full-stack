import React, { Component } from "react";
import './Loading.scss'

class Loading extends Component {
    render() {
        return (
            <div className="Loading-container">
                <p>
                    <span>Loading
                        <i className="dot-1 fas fa-circle"></i>
                        <i className="dot-2 fas fa-circle"></i>
                        <i className="dot-3 fas fa-circle"></i>
                    </span>
                </p>
            </div>
        )
    }
}

export default Loading