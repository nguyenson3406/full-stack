import React, {Component} from "react";
import {toast} from 'react-toastify';

class AddTodo extends Component{
    
    state= {
        id: '',
        title: ''
    }

    onChangeinput = (event) =>{
        this.setState({
            title: event.target.value
        })
    }

    onClickAdd = () =>{
        if(!this.state.title){
            toast.error("Missing title's Todo!",{
                className: 'toast-message'
            })
            return;
        } else{
            toast.success("Success title's Todo!",{
                className: 'toast-message'
            })
            this.props.addTodo({
                id: Math.floor(Math.random()*1001),
                title: this.state.title
            })
            this.setState({
                title:''
            })
        }        
    }

    render(){
        return(
            <div>
                <input onChange={(event) => this.onChangeinput(event)}
                    value={this.state.title}
                ></input>
                <></> <button onClick={() => this.onClickAdd()}>Add</button>
            </div>
        )
    }
}

export default AddTodo