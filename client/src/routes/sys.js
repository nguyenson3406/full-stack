import UserManage from '../views/System/Manage/ListUser/UserManage'
import CatalogDoctor from '../views/System/catalog/doctor/CatalogDoctor';
import Profile from '../views/System/Manage/Profile/Profile';
import CreateNew from '../views/System/catalog/doctor/CreateNew';
import Edit from '../views/System/catalog/doctor/Edit';
import CatalogBlog from '../views/System/catalog/blog/CatalogBlog';
import CreateBlog from '../views/System/catalog/blog/CreateBlog';
import EditBlog from '../views/System/catalog/blog/EditBlog';
import CatalogClinic from '../views/System/catalog/clinic/CatalogClinic';
import CreateClinic from '../views/System/catalog/clinic/CreateClinic';
import EditClinic from '../views/System/catalog/clinic/EditClinic';
import CatalogSpecialty from '../views/System/catalog/specialty/CatalogSpecialty';
import CreateSpecialty from '../views/System/catalog/specialty/CreateSpecialty';
import EditSpecialty from '../views/System/catalog/specialty/EditSpecialty';
import Schedule from '../views/System/management/schedule/Schedule';
import Booking from '../views/System/management/booking/Booking';
import Home from '../views/System/Home/Home';

export const initSysRouter = {
    SYSTEM: <Home></Home>,
    SYSTEM_CATALOG_DOCTOR: <CatalogDoctor></CatalogDoctor>,
    SYSTEM_CREATE_DOCTOR: <CreateNew></CreateNew>,
    SYSTEM_EDIT_DOCTOR: <Edit></Edit>,
    SYSTEM_CATALOG_SPECIALTY: <CatalogSpecialty></CatalogSpecialty>,
    SYSTEM_CREATE_SPECIALTY: <CreateSpecialty></CreateSpecialty>,
    SYSTEM_EDIT_SPECIALTY: <EditSpecialty></EditSpecialty>,
    SYSTEM_CATALOG_CLINIC: <CatalogClinic></CatalogClinic>,
    SYSTEM_CREATE_CLINIC: <CreateClinic></CreateClinic>,
    SYSTEM_EDIT_CLINIC: <EditClinic></EditClinic>,
    SYSTEM_CATALOG_BLOG: <CatalogBlog></CatalogBlog>,
    SYSTEM_CREATE_BLOG: <CreateBlog></CreateBlog>,
    SYSTEM_EDIT_BLOG: <EditBlog></EditBlog>,
    SYSTEM_SCHEDULE: <Schedule></Schedule>,
    SYSTEM_BOOKING: <Booking></Booking>,
    SYSTEM_USERMANAGE: <UserManage></UserManage>,
    SYSTEM_PROFILE: <Profile></Profile>,
};