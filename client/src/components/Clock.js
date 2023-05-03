import React, {Component} from 'react'

export default class Clock extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <p>Hien thi dong ho: {this.props.time.toString()}</p>
        )
    }
}