import express from "express";
import initManageRouter from './manage'
import initAuthRouter from "./auth";
import initPageRouter from "./page";
import initDoctorRouter from "./doctor"
import initInforManagementRouter from "./inforManagement";
import initSpecialtyRouter from "./specialty";
import initClinicRouter from "./clinic";
import initBlogRouter from "./blog";

let router = express.Router();

const initApiRouter = (app) => {
    // router.get("/", homeConrollers.getHomePage);
    // router.get("/CRUD", homeConrollers.getPostCRUD);
    // router.post("/post-CRUD", homeConrollers.postCRUD);
    // router.get("/displayGetCRUD", homeConrollers.displayGetCRUD);
    // router.get("/EditCRUD", homeConrollers.getEditCRUD);
    // router.post("/put-CRUD", homeConrollers.putCRUD);
    // router.get("/DeleteCRUD", homeConrollers.deleteCRUD);
    initAuthRouter(app);
    initManageRouter(app);
    initPageRouter(app);
    initDoctorRouter(app);
    initInforManagementRouter(app);
    initSpecialtyRouter(app);
    initClinicRouter(app);
    initBlogRouter(app);
}

export default initApiRouter