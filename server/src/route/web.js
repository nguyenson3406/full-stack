import express from "express";
import homeConrollers from "../controllers/homeConrollers";

let router = express.Router();

const initWebRouter = (app) => {
    router.get("/", homeConrollers.getHomePage)
    return app.use("/", router)
}

export default initWebRouter