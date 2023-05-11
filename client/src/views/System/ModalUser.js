import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import { emitter } from "../../utils/emitter"
import { toast } from 'react-toastify';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: ''
        }

    }

    componentDidMount() {
        this.listenToEmitter();
    }

    reset = () => {
        let reset = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: ''
        }
        this.setState({
            ...reset
        })
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_DATA', () => {
            this.reset()
        })
    }

    handleOnChange = (event, id) => {
        let userInfoCopy = this.state
        userInfoCopy[id] = event.target.value
        this.setState({
            ...userInfoCopy
        })
    }

    createNewUser = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId']
        for (var i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                return (toast.error(`Mising parameter`, {
                    className: 'toast-message'
                }))
            }
        }
        this.props.createNewUser(this.state)
        this.props.handleClose()
    }

    render() {
        let { show, handleClose } = this.props
        return (
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <span>Create new user</span>
                    <button className="close-modal" onClick={handleClose}><i className="fas fa-times"></i></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Email"
                                onChange={(event) => this.handleOnChange(event, 'email')} value={this.state.email}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password"
                                onChange={(event) => this.handleOnChange(event, 'password')} value={this.state.password}
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
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Phone number</label>
                            <input type="text" className="form-control" name="phonenumber" placeholder="Phonenumber"
                                onChange={(event) => this.handleOnChange(event, 'phonenumber')} value={this.state.phonenumber}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Gender</label>
                            <select name="gender" className="form-select"
                                onChange={(event) => this.handleOnChange(event, 'gender')} value={this.state.gender}>
                                <option value=''>Choose...</option>
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Role</label>
                            <select name="roleId" className="form-select"
                                onChange={(event) => this.handleOnChange(event, 'roleId')} value={this.state.roleId}>
                                <option value=''>Choose...</option>
                                <option value="0">Admin</option>
                                <option value="1">Dortor</option>
                                <option value="2">Patient</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.createNewUser()}>
                        Add New
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalUser