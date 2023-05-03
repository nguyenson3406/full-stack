import React, {Component} from 'react'
import {toast } from 'react-toastify';
// import Info from './Info'

class From extends Component{
    // state = {
    //     fistName : '',
    //     lastName : '',
    //     arrJobs: [
    //         { id: 'abcJob1', title: 'Developers', salary: '500 $' },
    //         { id: 'abcJob2', title: 'Testers', salary: '400 $' },
    //         { id: 'abcJob3', title: 'Project managers', salary: '1000 $' }
    //     ]
    // }

    state = {
        title: '',
        salary: ''
    }

    onChangetitle = (event) =>{
        this.setState({
            title: event.target.value
        })
    }

    onChangesalary = (event) =>{
        this.setState({
            salary: event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        if(!this.state.title || !this.state.salary){
            toast.error("Missing title's Todo!",{
                className:'toast-message'
            })
            return;
        }
        this.props.addNewJob({
            id: Math.floor(Math.random() * 1001),
            title: this.state.title,
            salary: this.state.salary
        })
        this.setState({
            title: '',
            salary: ''
        })
        console.log('check input',this.state)
    }

    render(){
        console.log('check input',this.props)
        return(
            <div>
                <form>
                <label htmlFor="title">Job's title:</label><br/>
                <input 
                    type="text"
                    onChange={(event) => this.onChangetitle(event)}
                    value={this.state.title}/><br/>
                <label htmlFor="salary">Salary:</label><br/>
                <input 
                    type="text"
                    onChange={(event) => this.onChangesalary(event)} 
                    value={this.state.salary}/><br/><br/>
                <input type="submit" 
                    onClick={(event) => this.handleSubmit(event)}/>
                </form>
                {/* <form>
                <label htmlFor="fname">First name:</label><br/>
                <input 
                    type="text"
                    onChange={(event) => this.onChangefistname(event)}
                    value={this.state.fistName}/><br/>
                <label htmlFor="lname">Last name:</label><br/>
                <input 
                    type="text"
                    onChange={(event) => this.onChangelastname(event)} 
                    value={this.state.lastName}/><br/><br/>
                <input type="submit" 
                    onClick={(event) => this.handleSubmit(event)}/>
                </form>
                <Info arrJobs={this.state}></Info> */}
            </div>
        )
    }
}

export default From