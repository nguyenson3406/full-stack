import React, {Component} from 'react'

export default class Controll extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
                <button onClick={this.props.on}>Start 2</button>
                <button onClick={this.props.off}>End 2</button>
            </>
        )
    }
}