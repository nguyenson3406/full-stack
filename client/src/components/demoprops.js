import React , {Component} from 'react';
//cach viet tat cau lenh
//chi dung de doc va khong render lai
class Count extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div>
                <p>{this.props.number1}</p>
            </div>
        )
    }
}

export default Count;