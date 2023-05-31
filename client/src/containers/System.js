import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../views/System/System.scss'
import { path } from '../utils'
import { initSysRouter } from '../routes/sys'

class System extends Component {
    render() {
        return (
            <div className='System-container'>
                <div className='System-content'>
                    <Switch>
                        <Route path={path.USERMANAGE}>{initSysRouter.USERMANAGE}</Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default System