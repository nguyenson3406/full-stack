import React, {Component} from "react";
import { withRouter } from "react-router-dom";

class Home extends Component{

    componentDidMount(){
        setTimeout(() => {
            this.props.history.push('/todo')
        }, 3000);
    }
    render(){
        console.log('check props:',this.props)
        return(
            <>
                <p>Wellcome to my Reactjs</p>
            </>
        )
    }
}

export default withRouter(Home)