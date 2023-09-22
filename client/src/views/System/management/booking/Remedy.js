import React, { Component } from "react";
import './Remedy.scss'
import Modal from 'react-bootstrap/Modal';
import { emitter } from "../../../../utils/emitter";
import { toast } from 'react-toastify';

class Remedy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            isDone: '',
            file: '',
        }
    }

    componentDidMount = async () => {
        await this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('REMEDY_RESET_DATA', (data) => {
            this.setState({
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                isDone: data.isDone,
                file: '',
            })
        })
    }

    handleFileRead = async (event) => {
        const file = event.target.files[0]
        const base64 = await this.convertBase64(file)
        this.setState({
            file: base64,
        });
    }

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    validateRemedy = () => {
        let data = this.state
        let arrInput = ['id', 'email', 'firstName', 'isDone', 'file']
        for (let i = 0; i < arrInput.length; i++) {
            if (!data[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        let isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!data.email.match(isValidEmail)) {
            return (toast.error(`Enter valid Email!`, {
                className: 'toast-message'
            }))
        }
        this.props.handUpdateBooking(data)
    }

    render() {
        let { toggle, handToggle } = this.props
        return (
            <div className="Remedy-container">
                <Modal show={toggle} onHide={handToggle}
                    className="Remedy-content" centered>
                    <Modal.Header>
                        <div className="header-content col-12">
                            <span className="title">Gui hoa don kham benh</span>
                            <span className="close" onClick={handToggle}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="RemedyForm row col-12">
                            <div className="form-group col-5 input-email">
                                <label>Email:</label>
                                <input type="email" className="form-control" name="email" placeholder="Email"
                                    value={this.state.email || ''} disabled
                                />
                            </div>
                            <div className="form-group col-7 input-file">
                                <label className="col-12">File:</label>
                                <input type="file" name="fileUpload" onChange={(event) => this.handleFileRead(event)} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => this.validateRemedy()}>
                            Send
                        </button>
                        <button className="btn btn-secondary" onClick={handToggle}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Remedy