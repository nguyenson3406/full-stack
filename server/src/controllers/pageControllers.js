import path from 'path';
var appRoot = require('app-root-path');

let getImage = async (req, res) => {
    let image = req.params.name;
    let filePath = path.join(__dirname, `../public/image/${image}`);
    res.sendFile(filePath);
}

module.exports = {
    getImage: getImage,
}