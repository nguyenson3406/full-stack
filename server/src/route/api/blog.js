import express from "express";
import blogControllers from "../../controllers/blogControllers"
import verifyJWT from '../../middleware/verifyJWT'

let router = express.Router();

const initBlogRouter = (app) => {
    // router.use(verifyJWT.verifyAccessToken)
    router.get("/getAllBlog", blogControllers.getAllBlog);
    router.post("/createNewBlog", blogControllers.createNewBlog);
    router.put("/updateBlog", blogControllers.updateBlog);
    router.delete("/deleteBlog", blogControllers.deleteBlog);
    router.put("/showBlog", blogControllers.showBlog);
    return app.use("/api/catalogBlog", router)
}

export default initBlogRouter