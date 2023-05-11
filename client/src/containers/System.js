import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import UserManage from '../views/System/UserManage'
import '../views/System/System.scss'

class System extends Component {
    render() {
        return (
            <div className='System-container'>
                <div className='System-content'>
                    <Switch>
                        <Route path='/system/user-manage'><UserManage></UserManage></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default System