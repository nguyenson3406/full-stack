import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import { emitter } from "../../../utils/emitter"
import { toast } from 'react-toastify';

class ModalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_EDIT_DATA', (data) => {
            this.setState({
                id: data.id,
                email: data.email,
                password: '********',
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address
            })
        })
    }

    handleOnChange = (event, id) => {
        let userInfoCopy = { ...this.state }
        userInfoCopy[id] = event.target.value
        this.setState({
            ...userInfoCopy
        })
    }

    updateUser = () => {
        let data = this.state
        let arrInput = ['firstName', 'lastName', 'address']
        for (var i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        this.props.updateUser(this.state)
        this.props.handleClose()
    }

    render() {
        let { show, handleClose } = this.props
        return (
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <span>Edit user</span>
                    <button className="close-modal" onClick={handleClose}><i className="fas fa-times"></i></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Email"
                                onChange={(event) => this.handleOnChange(event, 'email')} value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password"
                                onChange={(event) => this.handleOnChange(event, 'password')} value={this.state.password}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>First name</label>
                            <input type="text" className="form-control" name="firstName" placeholder="First name"
                                onChange={(event) => this.handleOnChange(event, 'firstName')} value={this.state.firstName}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Last name</label>
                            <input type="text" className="form-control" name="lastName" placeholder="Last name"
                                onChange={(event) => this.handleOnChange(event, 'lastName')} value={this.state.lastName}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" name="address" placeholder="Address"
                            onChange={(event) => this.handleOnChange(event, 'address')} value={this.state.address}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.updateUser()}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalEdit