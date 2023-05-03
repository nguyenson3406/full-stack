import React, {Component} from 'react'
import From from './From'
import Info from './Info'

class ControllSet extends Component{

    state = {
        fistName : '',
        lastName : '',
        arrJobs: [
            { id: 'abcJob1', title: 'Developers', salary: '500 $' },
            { id: 'abcJob2', title: 'Testers', salary: '400 $' },
            { id: 'abcJob3', title: 'Project managers', salary: '1000 $' }
        ]
    }
    
    addNewJob = (job) =>{
        this.setState({
            arrJobs: [...this.state.arrJobs, job]
        })
    }
    
    deleteJob = (job) =>{
        let arrJobs = this.state.arrJobs
        let current = arrJobs.filter(item=> item.id !== job.id)
        this.setState({
            arrJobs:  current
        })
    }

    componentDidMount(){
        console.log('run didmount noi goi API')
    }

    componentDidUpdate(prevProps,prevState){
        console.log('run didupdate prevProps',prevProps,'prevState',prevState,'noi su ly du lieu khi goi API')
    }

    render(){
        console.log('this state:', this.state)
        return(
            <>
                <From addNewJob={this.addNewJob}></From>
                <Info arrJobs={this.state.arrJobs}
                        deleteJob={this.deleteJob}
                ></Info>
            </>           
        )
    }
}

 export default ControllSet