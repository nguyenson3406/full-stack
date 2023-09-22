import express from "express";
import homeConrollers from "../controllers/homeConrollers";

let router = express.Router();

const initWebRouter = (app) => {
    router.get("/", homeConrollers.getHomePage);
    router.get("/CRUD", homeConrollers.getPostCRUD);
    router.post("/post-CRUD", homeConrollers.postCRUD);
    router.get("/displayGetCRUD", homeConrollers.displayGetCRUD);
    router.get("/EditCRUD", homeConrollers.getEditCRUD);
    router.post("/put-CRUD", homeConrollers.putCRUD);
    router.get("/DeleteCRUD", homeConrollers.deleteCRUD);

    return app.use("/", router)
}

export default initWebRouter