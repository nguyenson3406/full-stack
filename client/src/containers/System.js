import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../views/System/System.scss'
import { path } from '../utils'
import { initSysRouter } from '../routes/sys'
import NavSystem from '../views/Nav/NavSystem'
import NavSystemCol from '../views/Nav/NavSystemCol'
import Profile from '../views/System/Manage/Profile/Profile'
import Edit from '../views/System/catalog/doctor/Edit'
import CreateNew from '../views/System/catalog/doctor/CreateNew'
import Schedule from '../views/System/management/schedule/Schedule'

class System extends Component {
    render() {
        return (
            <div className='System-container'>
                <NavSystem></NavSystem>
                <div className='System-content'>
                    <div className='side-nav-container col-2'>
                        <NavSystemCol></NavSystemCol>
                    </div>
                    <div className='content col-10'>
                        <Switch>
                            <Route path="/admin/test"><Schedule></Schedule></Route>
                            <Route path="/admin/catalog/doctor/new"><CreateNew></CreateNew></Route>
                            <Route path="/admin/catalog/doctor/edit/:id"><Edit></Edit></Route>
                            <Route path="/admin/user/profile"><Profile></Profile></Route>
                            <Route path={path.CATALOG_DOCTOR} exact>{initSysRouter.CATALOG_DOCTOR}</Route>
                            <Route path={path.USERMANAGE}>{initSysRouter.USERMANAGE}</Route>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default System