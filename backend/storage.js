// File storage engine
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// File system reader engine
const fs = require('fs');

const storage = multer.diskStorage({
    destination: __dirname+'\\public\\images\\',
    filename: function(req, file, cb) {
        if(file){
            return crypto.pseudoRandomBytes(16, function(err, raw) {
                if (err) {
                    return cb(err);
                }
                return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
            });
        } else return null;
    }
});

function urlParser(hostUrl, filename){
    return "https://192.168.1.116:3000/images/"+filename
}

function getFile(file){
    return fs.readFileSync(__dirname + "\\public\\images\\" + file);
};

function getCertificate(file){
    return fs.readFileSync(__dirname+"\\certificate\\"+file);
};

module.exports = {
    handleFile: multer({ storage: storage }).single('upload'),
    getFile: getFile,
    getCertificate: getCertificate,
    urlParser: urlParser
};  