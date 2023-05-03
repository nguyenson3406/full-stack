import logo from '../assets/images/logo.svg';
import '../styles/App.scss';
// import App2 from './App2';
import TodoList from '../components/Todos/TodoList';
import ControllSet from '../components/About/ControllSet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Nav/Nav';
import Home from '../components/Home';
import ListUsers from '../components/Users/ListUsers';
import DetailUser from '../components/Users/DetailUser';
import Login from '../views/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path='/login'>
              <Login></Login>
            </Route>
          </Switch>
          <Nav></Nav>
          <Switch>
            <Route path='/' exact>
              <Home></Home>
            </Route>
            <Route path="/todo">
              <TodoList></TodoList>
            </Route>
            <Route path="/about">
              <ControllSet></ControllSet>
            </Route>
            <Route path="/user" exact>
              <ListUsers></ListUsers>
            </Route>
            <Route path="/user/:id">
              <DetailUser></DetailUser>
            </Route>
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
        </header>
      </div>
    </Router>
  );
}

export default App;

