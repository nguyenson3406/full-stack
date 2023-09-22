import express from "express";
import authControlers from "../../controllers/authControllers";
import verifyJWT from '../../middleware/verifyJWT';

let router = express.Router();

const initAuthRouter = (app) => {
    router.post("/login", authControlers.handLogin);
    router.post("/logout", authControlers.handLogout);
    router.get("/refreshToken", authControlers.refreshToken);
    router.get("/authLogin", verifyJWT.verifyAccessToken, authControlers.authLogin);
    return app.use("/api", router);
}

export default initAuthRouter