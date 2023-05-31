import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { initWebRouter } from '../routes/web'
import { path } from '../utils';

class Webside extends Component {
    render() {
        return (
            <div className='Webside-container'>
                <div className='Webside-content'>
                    {initWebRouter.NAV}
                    <Switch>
                        <Route path={path.HOME} exact>{initWebRouter.HOME}</Route>
                        <Route path={path.TODO}>{initWebRouter.TODO}</Route>
                        <Route path={path.ABOUT}>{initWebRouter.ABOUT}</Route>
                        <Route path={path.USER} exact>{initWebRouter.USER}</Route>
                        <Route path={path.DETAIL_USER}>{initWebRouter.DETAIL_USER}</Route>
                    </Switch>
                    {initWebRouter.FOOTER}
                </div>
            </div>
        )
    }
}

export default Webside