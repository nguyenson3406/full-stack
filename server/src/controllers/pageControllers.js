import path from 'path';
var appRoot = require('app-root-path');
import pageServices from '../services/pageServices'

let getImage = async (req, res) => {
    let image = req.params.name;
    let filePath = path.join(__dirname, `../public/image/Markdown/${image}`);
    res.sendFile(filePath);
}

let getAllcode = async (req, res) => {
    let type = req.query.type
    let allcodeData = await pageServices.getAllcode(type)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        allcode: allcodeData ? allcodeData : {}
    })
}

module.exports = {
    getImage: getImage,
    getAllcode: getAllcode,
}