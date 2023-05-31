import '../styles/App.scss';
import { path } from '../utils'
import { initWebRouter } from '../routes/web';
import { ToastContainer, toast } from 'react-toastify';
import Webside from './Webside';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../components/Auth/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

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
          <Switch>
            <Route path={path.LOGIN}><Auth></Auth>{initWebRouter.LOGIN}</Route>
            <Route path={path.SYSTEM}><Auth></Auth>{initWebRouter.SYSTEM}</Route>
            <Route path='/'><Webside></Webside></Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;

