import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../views/System/System.scss'
import { path } from '../utils'
import { initSysRouter } from '../routes/sys'
import { initWebRouter } from '../routes/web'
import NavSystem from '../views/Nav/NavSystem'
import NavSystemCol from '../views/Nav/NavSystemCol'
import { connect } from 'react-redux'

class System extends Component {
    render() {
        let dataUser = this.props.dataUser
        return (
            <div className='System-container'>
                {dataUser ?
                    <>
                        <NavSystem></NavSystem>
                        <div className='System-content'>
                            <div className='side-nav-container col-2'>
                                <NavSystemCol></NavSystemCol>
                            </div>
                            {dataUser.roleId.includes('R1') ?
                                <div className='content col-10'>
                                    <Switch>
                                        <Route path={path.SYSTEM} exact>{initSysRouter.SYSTEM}</Route>
                                        <Route path={path.SYSTEM_CATALOG_DOCTOR} exact>{initSysRouter.SYSTEM_CATALOG_DOCTOR}</Route>
                                        <Route path={path.SYSTEM_CREATE_DOCTOR}>{initSysRouter.SYSTEM_CREATE_DOCTOR}</Route>
                                        <Route path={path.SYSTEM_EDIT_DOCTOR}>{initSysRouter.SYSTEM_EDIT_DOCTOR}</Route>
                                        <Route path={path.SYSTEM_CATALOG_SPECIALTY} exact>{initSysRouter.SYSTEM_CATALOG_SPECIALTY}</Route>
                                        <Route path={path.SYSTEM_CREATE_SPECIALTY}>{initSysRouter.SYSTEM_CREATE_SPECIALTY}</Route>
                                        <Route path={path.SYSTEM_EDIT_SPECIALTY}>{initSysRouter.SYSTEM_EDIT_SPECIALTY}</Route>
                                        <Route path={path.SYSTEM_CATALOG_CLINIC} exact>{initSysRouter.SYSTEM_CATALOG_CLINIC}</Route>
                                        <Route path={path.SYSTEM_CREATE_CLINIC}>{initSysRouter.SYSTEM_CREATE_CLINIC}</Route>
                                        <Route path={path.SYSTEM_EDIT_CLINIC}>{initSysRouter.SYSTEM_EDIT_CLINIC}</Route>
                                        <Route path={path.SYSTEM_CATALOG_BLOG} exact>{initSysRouter.SYSTEM_CATALOG_BLOG}</Route>
                                        <Route path={path.SYSTEM_CREATE_BLOG}>{initSysRouter.SYSTEM_CREATE_BLOG}</Route>
                                        <Route path={path.SYSTEM_EDIT_BLOG}>{initSysRouter.SYSTEM_EDIT_BLOG}</Route>
                                        <Route path={path.SYSTEM_SCHEDULE}>{initSysRouter.SYSTEM_SCHEDULE}</Route>
                                        <Route path={path.SYSTEM_BOOKING}>{initSysRouter.SYSTEM_BOOKING}</Route>
                                        <Route path={path.SYSTEM_USERMANAGE}>{initSysRouter.SYSTEM_USERMANAGE}</Route>
                                        <Route path={path.SYSTEM_PROFILE}>{initSysRouter.SYSTEM_PROFILE}</Route>
                                        <Route path='*'>{initWebRouter.ERROR404}</Route>
                                    </Switch>
                                </div>
                                : null
                            }
                            {dataUser.roleId.includes('R2') ?
                                <div className='content col-10'>
                                    <Switch>
                                        <Route path={path.SYSTEM} exact>{initSysRouter.SYSTEM}</Route>
                                        <Route path={path.SYSTEM_CATALOG_DOCTOR} exact>{initSysRouter.SYSTEM_CATALOG_DOCTOR}</Route>
                                        <Route path={path.SYSTEM_CREATE_DOCTOR}>{initSysRouter.SYSTEM_CREATE_DOCTOR}</Route>
                                        <Route path={path.SYSTEM_EDIT_DOCTOR}>{initSysRouter.SYSTEM_EDIT_DOCTOR}</Route>
                                        <Route path={path.SYSTEM_CATALOG_SPECIALTY} exact>{initSysRouter.SYSTEM_CATALOG_SPECIALTY}</Route>
                                        <Route path={path.SYSTEM_CREATE_SPECIALTY}>{initSysRouter.SYSTEM_CREATE_SPECIALTY}</Route>
                                        <Route path={path.SYSTEM_EDIT_SPECIALTY}>{initSysRouter.SYSTEM_EDIT_SPECIALTY}</Route>
                                        <Route path={path.SYSTEM_CATALOG_CLINIC} exact>{initSysRouter.SYSTEM_CATALOG_CLINIC}</Route>
                                        <Route path={path.SYSTEM_CREATE_CLINIC}>{initSysRouter.SYSTEM_CREATE_CLINIC}</Route>
                                        <Route path={path.SYSTEM_EDIT_CLINIC}>{initSysRouter.SYSTEM_EDIT_CLINIC}</Route>
                                        <Route path={path.SYSTEM_CATALOG_BLOG} exact>{initSysRouter.SYSTEM_CATALOG_BLOG}</Route>
                                        <Route path={path.SYSTEM_CREATE_BLOG}>{initSysRouter.SYSTEM_CREATE_BLOG}</Route>
                                        <Route path={path.SYSTEM_EDIT_BLOG}>{initSysRouter.SYSTEM_EDIT_BLOG}</Route>
                                        <Route path={path.SYSTEM_PROFILE}>{initSysRouter.SYSTEM_PROFILE}</Route>
                                        <Route path='*'>{initWebRouter.ERROR404}</Route>
                                    </Switch>
                                </div>
                                : null
                            }
                            {dataUser.roleId.includes('R3') ?
                                <div className='content col-10'>
                                    <Switch>
                                        <Route path={path.SYSTEM} exact>{initSysRouter.SYSTEM}</Route>
                                        <Route path={path.SYSTEM_SCHEDULE}>{initSysRouter.SYSTEM_SCHEDULE}</Route>
                                        <Route path={path.SYSTEM_BOOKING}>{initSysRouter.SYSTEM_BOOKING}</Route>
                                        <Route path={path.SYSTEM_PROFILE}>{initSysRouter.SYSTEM_PROFILE}</Route>
                                        <Route path='*'>{initWebRouter.ERROR404}</Route>
                                    </Switch>
                                </div>
                                : null
                            }
                        </div>
                    </>
                    :
                    <Switch>
                        <Route path='*'>{initWebRouter.ERROR404}</Route>
                    </Switch>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataUser: state.user.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(System)