import { lazy } from 'react';
import Nav from '../views/Nav/Nav';
import System from '../containers/System';
import LoginAdmin from '../views/Login/LoginAdmin'
import Footer from '../views/Footer/Footer';
import Error404 from '../views/Error404/Error404';
import Loading from '../views/Loading/Loading';

const Home = lazy(() => import('../views/Home/Home'))
const Clinic = lazy(() => import('../views/Clinic/Clinic'))
const ClinicDetail = lazy(() => import('../views/ClinicDetail/ClinicDetail'))
const Blog = lazy(() => import('../views/Blog/Blog'))
const BlogDetail = lazy(() => import('../views/BlogDetail/BlogDetail'))
const ServicesHome = lazy(() => import('../views/ServicesPage/ServicesHome'))
const SpecialtyDeatil = lazy(() => import('../views/Specialty/SpecialtyDetail'))
const DetailDoctor = lazy(() => import('../views/DetailDoctor/DetailDoctor'))
const VerifyBooking = lazy(() => import('../views/VerifyBooking/VerifyBooking'))

export const initWebRouter = {
    HOME: <Home></Home>,
    CLINIC: <Clinic></Clinic>,
    CLINIC_DETAIL: <ClinicDetail></ClinicDetail>,
    BLOG: <Blog></Blog>,
    BLOG_DETAIL: <BlogDetail></BlogDetail>,
    SERVICES_PAGE: <ServicesHome></ServicesHome>,
    SPECIALTY_PAGE: <SpecialtyDeatil></SpecialtyDeatil>,
    DOCTOR_DETAIL: <DetailDoctor></DetailDoctor>,
    VERIFY_BOOKING: <VerifyBooking></VerifyBooking>,
    ERROR404: <Error404></Error404>,
    NAV: <Nav></Nav>,
    FOOTER: <Footer></Footer>,
    LOADING: <Loading></Loading>,
    SYSTEM: <System></System>,
    SYSTEM_LOGIN: <LoginAdmin></LoginAdmin>,
};