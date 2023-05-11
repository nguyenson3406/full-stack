import logo from '../assets/images/logo.svg';
import '../styles/App.scss';
import { path } from '../utils'
import { initWebRouter } from '../routes/web';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../components/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route path={path.LOGIN}><Auth></Auth>{initWebRouter.LOGIN}</Route>
          {initWebRouter.NAV}
          <Switch>
            <Route path={path.SYSTEM}>{initWebRouter.SYSTEM}</Route>
            <Route path={path.HOME} exact>{initWebRouter.HOME}</Route>
            <Route path={path.TODO}><Auth></Auth>{initWebRouter.TODO}</Route>
            <Route path={path.ABOUT}>{initWebRouter.ABOUT}</Route>
            <Route path={path.USER} exact>{initWebRouter.USER}</Route>
            <Route path={path.DETAIL_USER}>{initWebRouter.DETAIL_USER}</Route>
          </Switch>
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
        </Router>
      </header>
    </div>
  );
}

export default App;

