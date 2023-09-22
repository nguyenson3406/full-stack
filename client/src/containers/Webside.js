import React, { Component, lazy, Suspense } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { initWebRouter } from '../routes/web'
import { path } from '../utils';
import ScrollToTop from '../components/HOC/ScrollToTop';


class Webside extends Component {
    render() {
        return (
            <div className='Webside-container'>
                {initWebRouter.NAV}
                <Suspense fallback={initWebRouter.LOADING}>
                    <ScrollToTop>
                        <Switch>
                            <Route path={path.HOME} exact>{initWebRouter.HOME}</Route>
                            <Route path={path.CLINIC} exact>{initWebRouter.CLINIC}</Route>
                            <Route path={path.CLINIC_DETAIL}>{initWebRouter.CLINIC_DETAIL}</Route>
                            <Route path={path.BLOG} exact>{initWebRouter.BLOG}</Route>
                            <Route path={path.BLOG_DETAIL}>{initWebRouter.BLOG_DETAIL}</Route>
                            <Route path={path.SERVICES_PAGE}>{initWebRouter.SERVICES_PAGE}</Route>
                            <Route path={path.SPECIALTY_PAGE}>{initWebRouter.SPECIALTY_PAGE}</Route>
                            <Route path={path.DOCTOR_DETAIL}>{initWebRouter.DOCTOR_DETAIL}</Route>
                            <Route path={path.VERIFY_BOOKING}>{initWebRouter.VERIFY_BOOKING}</Route>
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