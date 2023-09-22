import express from "express";
import clinicControllers from "../../controllers/clinicControllers"
import verifyJWT from '../../middleware/verifyJWT'

let router = express.Router();

const initClinicRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.get("/getAllClinic", clinicControllers.getAllClinic);
    router.post("/createNewClinic", clinicControllers.createNewClinic);
    router.put("/updateClinic", clinicControllers.updateClinic);
    router.delete("/deleteClinic", clinicControllers.deleteClinic);
    router.put("/showClinic", clinicControllers.showClinic);
    return app.use("/api/catalogClinic", router)
}

export default initClinicRouter