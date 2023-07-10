import React, { Component, lazy, Suspense } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { initWebRouter } from '../routes/web'
import { path } from '../utils';
import ScrollToTop from '../components/HOC/ScrollToTop';
import Home from '../components/Home';

class Webside extends Component {
    render() {
        return (
            <div className='Webside-container'>
                {initWebRouter.NAV}
                <Suspense fallback={initWebRouter.LOADING}>
                    <ScrollToTop>
                        <Switch>
                            <Route path={path.HOME} exact>{initWebRouter.HOME}</Route>
                            <Route path={path.TODO} exact>{initWebRouter.TODO}</Route>
                            <Route path={path.ABOUT} exact>{initWebRouter.ABOUT}</Route>
                            <Route path={path.USER} exact>{initWebRouter.USER}</Route>
                            <Route path={path.DETAIL_USER} exact>{initWebRouter.DETAIL_USER}</Route>
                            <Route path='/test'><Home></Home></Route>
                            <Route path='*'>{initWebRouter.ERROR404}</Route>
                        </Switch>
                    </ScrollToTop>
                    {initWebRouter.FOOTER}
                </Suspense>
            </div>
        )
    }
}

export default Webside