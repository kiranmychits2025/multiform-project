
const express = require("express");
const { fileSubmitHandler, updateAadharPan, getAll, deleteAll } = require("../controllers/formController");

const { uploadAadharPan } = require("../middleware/formMiddleware");


const router = express.Router();



// CREATE NEW FORM (WITH FILE UPLOAD)

router.post(
  "/form",
  uploadAadharPan,
  fileSubmitHandler

);

//UPDATE FORM (WITH FILE HANDLING)**

router.put(
  "/form/:id",
  uploadAadharPan,
  updateAadharPan
)

//FETCH ALL FORMS**

router.get("/form",
  getAll
);

//DELETE FORM (AND FILES)**

router.delete("/form/:id",
  deleteAll
);

module.exports = router;
