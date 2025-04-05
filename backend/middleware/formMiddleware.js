
const multer = require("multer");
const uploadDir = "uploads/";
const fs = require("fs").promises;

fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

//  Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const uploadAadharPan = upload.fields([{ name: "aadhar", maxCount: 1 }, { name: "pan", maxCount: 1 }])

module.exports = { uploadAadharPan, };

