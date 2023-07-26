import express from "express";
import catalogDoctorControllers from "../../controllers/catalogDoctorControllers"
import verifyJWT from '../../middleware/verifyJWT'
import verifyUpload from '../../middleware/uploadFile'

let router = express.Router();

const initCatalogDoctorRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.post("/uploadFile", verifyUpload.upload, catalogDoctorControllers.uploadFile)
    router.get("/getAllDoctor", catalogDoctorControllers.getAllDoctor);
    router.post("/createNewDoctor", catalogDoctorControllers.createNewDoctor);
    router.put("/updateDoctor", catalogDoctorControllers.updateDoctor);
    router.delete("/deleteDoctor", catalogDoctorControllers.deleteDoctor);
    router.put("/showDoctor", catalogDoctorControllers.showDoctor);
    return app.use("/api/catalogDoctor", router)
}

export default initCatalogDoctorRouter