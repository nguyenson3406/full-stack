import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class DetailUser extends Component{
    
    state={
        user: []
    }

    componentDidMount = async() => {
        if(this.props.match&&this.props.match.params){
            let id = this.props.match.params.id
            let res = await axios.get(`https://reqres.in/api/users/${id}`)
            this.setState({
                user: res&&res.data&&res.data.data? res.data.data : []
            })
            console.log('check res:', res.data.data)
        }
    }

    backtoListUser = () => {
        this.props.history.push('/user')
    }

    render(){
        let {user}=this.state
        let isEmptyObj = Object.keys(user).length === 0;
        return(
            <div>
                <p>Hello! Wellcome from detail user id: {this.props.match.params.id}</p>
                {
                    isEmptyObj===false &&
                    <>
                        <div>User's name: {user.fist_name} {user.last_name}</div>
                        <div>User's email: {user.email}</div>
                        <div><img src={user.avatar}></img></div>
                        <div><button onClick={() => this.backtoListUser()}>Back</button></div>
                    </>
                }
            </div>
        )
    }
}

export default withRouter(DetailUser)