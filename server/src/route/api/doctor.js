import express from "express";
import doctorControllers from "../../controllers/doctorControllers"
import verifyJWT from '../../middleware/verifyJWT'
import verifyUpload from '../../middleware/uploadFile'

let router = express.Router();

const initDoctorRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.post("/uploadFile", verifyUpload.upload, doctorControllers.uploadFile)
    router.get("/getAllDoctor", doctorControllers.getAllDoctor);
    router.post("/createNewDoctor", doctorControllers.createNewDoctor);
    router.put("/updateDoctor", doctorControllers.updateDoctor);
    router.delete("/deleteDoctor", doctorControllers.deleteDoctor);
    router.put("/showDoctor", doctorControllers.showDoctor);
    router.get("/getExtraInfo", doctorControllers.handgetExtraInfo);
    return app.use("/api/catalogDoctor", router)
}

export default initDoctorRouter