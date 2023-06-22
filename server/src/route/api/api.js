import express from "express";
import initManageRouter from './manage'
import initAuthRouter from "./auth";

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
}

export default initApiRouter