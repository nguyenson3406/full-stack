import React, {Component} from 'react'

class Info extends Component{
    
    state = {
        showJods: false
    }

    infoShowHide = () =>{
        this.setState({
            showJods: !this.state.showJods
        })
    }

    onClickdeleteJob = (job) => {
        console.log('check job', job)
        this.props.deleteJob(job)
    }
    render(){

        console.log('check input',this.state.showJods)
        // const {arrJobs,fistName,lastName} = this.props.arrJobs;
        const {arrJobs} = this.props
        const {showJods} = this.state;
        
        return(
            <div className='jod-list'>
            {showJods === false ?
                <div>
                    <button onClick={this.infoShowHide}>Show</button>
                </div>
                :
                <div>
                    {
                        arrJobs.map((item, index) => {
                        return(
                            <div key={item.id}>
                                {item.title} - {item.salary}
                                <></> <span onClick={() => this.onClickdeleteJob(item)}>X</span>
                            </div>                           
                        )
                    })
                    }
                    <button onClick={this.infoShowHide}>Hide</button>
                </div>               
            }               
            </div>
        )
    }
}

export default Info