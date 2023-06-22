import express from "express";
import manageControlers from "../../controllers/manageControllers"
import verifyJWT from '../../middleware/verifyJWT'

let router = express.Router();

const initManageRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.get("/getAllUser", manageControlers.getAllUser);
    router.post("/createNewUser", manageControlers.createNewUser);
    router.put("/updateUser", manageControlers.updateUser)
    router.delete("/deleteUser", manageControlers.deleteUser)
    return app.use("/api/manage", router)
}

export default initManageRouter