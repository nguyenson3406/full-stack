import '../styles/App.scss';
import { path } from '../utils'
import { initWebRouter } from '../routes/web';
import { ToastContainer, toast } from 'react-toastify';
import Webside from './Webside';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../components/Auth/auth';
import ScrollToTop from '../components/HOC/ScrollToTop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router>
          <ScrollToTop>
            <Switch>
              <Route path={path.SYSTEM_LOGIN}><Auth isLogin='true'></Auth>{initWebRouter.SYSTEM_LOGIN}</Route>
              <Route path={path.SYSTEM}><Auth isLogin='false'></Auth>{initWebRouter.SYSTEM}</Route>
              <Route path='/'><Webside></Webside></Route>
            </Switch>
          </ScrollToTop>
        </Router>
      </header>
    </div>
  );
}

export default withTranslation()(App);