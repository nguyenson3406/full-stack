import { lazy } from 'react';
import Nav from '../views/Nav/Nav';
// import Home from '../views/Home/Home';
import TodoList from '../components/Todos/TodoList';
import ControllSet from '../components/About/ControllSet';
import ListUsers from '../components/Users/ListUsers';
import DetailUser from '../components/Users/DetailUser';
import System from '../containers/System';
import LoginAdmin from '../views/Login/LoginAdmin'
import Footer from '../views/Footer/Footer';
import Error404 from '../views/Error404/Error404';
import Loading from '../views/Loading/Loading';

const Home = lazy(() => import('../views/Home/Home'))

export const initWebRouter = {
    NAV: <Nav></Nav>,
    FOOTER: <Footer></Footer>,
    LOADING: <Loading></Loading>,
    HOME: <Home></Home>,
    TODO: <TodoList></TodoList>,
    ABOUT: <ControllSet></ControllSet>,
    USER: <ListUsers></ListUsers>,
    DETAIL_USER: <DetailUser></DetailUser>,
    SYSTEM: <System></System>,
    LOGIN: <LoginAdmin></LoginAdmin>,
    ERROR404: <Error404></Error404>,
};