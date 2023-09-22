import express from "express";
import pageControllers from "../../controllers/pageControllers"

let router = express.Router();

const initPageRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.get("/getImage/:name", pageControllers.getImage);
    router.get("/getAllcode", pageControllers.getAllcode);
    router.get("/getAllDoctor", pageControllers.getAllDoctor);
    router.get("/getDoctor", pageControllers.getDoctor);
    router.get("/getSchedule", pageControllers.getSchedule);
    router.get("/getDoctorInfor", pageControllers.getDoctorInfor);
    router.get("/getDoctorDescription", pageControllers.getDoctorDescription);
    router.get("/getDoctorDeltail", pageControllers.getDoctorDeltail);
    router.post("/createBooking", pageControllers.createBooking);
    router.post("/verifyBooking", pageControllers.verifyBooking);
    router.get("/getListSpecialty", pageControllers.getListSpecialty);
    router.get("/getSpecialtyInfo", pageControllers.getSpecialtyInfo);
    router.get("/getServicesInfor", pageControllers.getServicesInfor);
    router.get("/getClinic", pageControllers.getClinic);
    router.get("/getAllClinic", pageControllers.getAllClinic);
    router.get("/getDoctorClinic", pageControllers.getDoctorClinic);
    router.get("/getBlog", pageControllers.getBlog);
    router.get("/getAllBlog", pageControllers.getAllBlog);
    router.get("/searchData", pageControllers.searchData);
    return app.use("/api/page", router)
}

export default initPageRouter