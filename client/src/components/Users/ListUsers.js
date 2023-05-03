import React,{Component} from "react";
import axios from 'axios';
import './ListUsers.scss'
import { withRouter } from "react-router-dom";

class ListUsers extends Component{

    state = {
        listUsers: []
    }

    // componentDidMount = () =>{
    //     let res = axios.get('https://reqres.in/api/users?page=2')
    //     .then(res => {
    //         if(res && res.status !== 200){
    //             throw new Error('Some thing wrong this status code:', res.status)
    //         }
    //         console.log('check res:', res)
    //     })
    //     .catch(err => {
    //         console.log('check err:', err.message)
    //     })
    // }

    componentDidMount = async () =>{
        try{
            let res = await axios.get('https://reqres.in/api/users?page=1')
            if(res && res.status !== 200){
                throw new Error('Some thing wrong this status code:', res.status)
            }
            this.setState({
                listUsers: res && res.data && res.data.data ? res.data.data : []
            })
            console.log('check res:', res.data)
        }catch(e){
            console.log('check err:', e.message)
        }    
    }

    gotoDetail = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    render(){
        console.log('check state:', this.state)
        let {listUsers}=this.state
        return(
            <div className="List-users">
                <div className="title">This is List users</div>
                <div className="list-user-content">
                {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <div className="child" key={item.id} 
                                    onClick={() => this.gotoDetail(item.id)}>
                                    {index + 1} - {item.first_name} {item.last_name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(ListUsers)