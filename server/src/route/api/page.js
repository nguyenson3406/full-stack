import express from "express";
import pageControllers from "../../controllers/pageControllers"

let router = express.Router();

const initPageRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.get("/getImage/:name", pageControllers.getImage);
    return app.use("/api/page", router)
}

export default initPageRouter