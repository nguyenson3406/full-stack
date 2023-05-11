import Nav from '../components/Nav/Nav';
import Home from '../views/Example/Home';
import TodoList from '../components/Todos/TodoList';
import ControllSet from '../components/About/ControllSet';
import ListUsers from '../components/Users/ListUsers';
import DetailUser from '../components/Users/DetailUser';
import Login from '../views/Login/Login'
import System from '../containers/System';

export const initWebRouter = {
    NAV: <Nav></Nav>,
    HOME: <Home></Home>,
    LOGIN: <Login></Login>,
    TODO: <TodoList></TodoList>,
    ABOUT: <ControllSet></ControllSet>,
    USER: <ListUsers></ListUsers>,
    DETAIL_USER: <DetailUser></DetailUser>,
    SYSTEM: <System></System>
};