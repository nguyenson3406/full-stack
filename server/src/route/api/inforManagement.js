import express from "express";
import inforManagementControllers from "../../controllers/inforManagementController"
import verifyJWT from '../../middleware/verifyJWT'

let router = express.Router();

const initInforManagementRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.get("/getAllSchedule", inforManagementControllers.getAllSchedule);
    router.post("/bulkSchedule", inforManagementControllers.bulkSchedule);
    router.get("/getAllBooking", inforManagementControllers.getAllBooking);
    router.get("/getAllDoctor", inforManagementControllers.getAllDoctor);
    router.put("/updateBooking", inforManagementControllers.updateBooking);
    return app.use("/api/inforManagement", router)
}

export default initInforManagementRouter