import db from '../models/index';
import CRUDServices from '../services/CRUDServices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('==========')
        console.log(data);
        console.log('==========')
        return res.render("index.ejs");
    } catch (e) {
        console.log(e);
    }
}

let getPostCRUD = (req, res) => {
    return res.render("CRUD.ejs");
}

let postCRUD = async (req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send("this is postCRUD")
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser();

    return res.render("displayGetCRUD.ejs", { dataTable: data })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    let data = await CRUDServices.getUser(userId);
    return res.render("EditCRUD.ejs", { dataUser: data });
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDServices.updateUserData(data);
    return res.send("success Edit")
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    await CRUDServices.deleteUserData(userId);
    return res.send("sucess Delete")
}

module.exports = {
    getHomePage: getHomePage,
    getPostCRUD: getPostCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}