import express from "express";
import userControlers from "../controllers/userControllers"

let router = express.Router();

const initApiRouter = (app) => {
    // router.get("/", homeConrollers.getHomePage);
    // router.get("/CRUD", homeConrollers.getPostCRUD);
    // router.post("/post-CRUD", homeConrollers.postCRUD);
    // router.get("/displayGetCRUD", homeConrollers.displayGetCRUD);
    // router.get("/EditCRUD", homeConrollers.getEditCRUD);
    // router.post("/put-CRUD", homeConrollers.putCRUD);
    // router.get("/DeleteCRUD", homeConrollers.deleteCRUD);
    router.post("/login", userControlers.handLogin);
    router.get("/getAllUser", userControlers.getAllUser);
    router.post("/createNewUser", userControlers.createNewUser);
    router.put("/updateUser", userControlers.updateUser)
    router.delete("/deleteUser", userControlers.deleteUser)

    return app.use("/api", router)
}

export default initApiRouter