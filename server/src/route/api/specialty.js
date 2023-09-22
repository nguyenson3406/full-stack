import express from "express";
import specialtyControllers from "../../controllers/specialtyControllers"
import verifyJWT from '../../middleware/verifyJWT'

let router = express.Router();

const initSpecialtyRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.get("/getAllSpecialty", specialtyControllers.getAllSpecialty);
    router.post("/createNewSpecialty", specialtyControllers.createNewSpecialty);
    router.put("/updateSpecialty", specialtyControllers.updateSpecialty);
    router.delete("/deleteSpecialty", specialtyControllers.deleteSpecialty);
    router.put("/showSpecialty", specialtyControllers.showSpecialty);
    return app.use("/api/catalogSpecialty", router)
}

export default initSpecialtyRouter