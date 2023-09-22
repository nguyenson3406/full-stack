import express from "express";
import manageControlers from "../../controllers/manageControllers"
import verifyJWT from '../../middleware/verifyJWT'
import verifyUpload from '../../middleware/uploadFile'

let router = express.Router();

const initManageRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.post("/uploadFile", verifyUpload.upload, manageControlers.uploadFile)
    router.get("/getAllUser", manageControlers.getAllUser);
    router.post("/createNewUser", manageControlers.createNewUser);
    router.put("/updateUser", manageControlers.updateUser);
    router.delete("/deleteUser", manageControlers.deleteUser);
    router.put("/chancePassword", manageControlers.chancePassword);
    return app.use("/api/manage", router)
}

export default initManageRouter