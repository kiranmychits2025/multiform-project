
const Form = require("../models/Form");


const fileSubmitHandler = async (req, res) => {
  try {
    const newForm = new Form({
      ...req.body,
      aadhar: req.files["aadhar"] ? req.files.aadhar[0].path : "",
      pan: req.files["pan"] ? req.files.pan[0].path : "",
      termsAccepted: req.body.termsAccepted === "true",
    });

    await newForm.save();
    res.status(201).json({ message: "Form submitted successfully", data: newForm });
  } catch (error) {
    res.status(500).json({ message: "Error saving form", error: error.message });
  }
}

const updateAadharPan = async (req, res) => {
  try {
    // Find the existing form in MongoDB
    const formDoc = await Form.findById(req.params.id);
    if (!formDoc) {
      return res.status(404).json({ message: "Form not found" });
    }

    const updateData = { ...req.body };

    // Convert boolean values properly
    if (req.body.termsAccepted !== undefined) {
      updateData.termsAccepted = req.body.termsAccepted === "true";
    }

    // Handle Aadhar File Update
    if (req.files?.aadhar?.[0]) {
      const newAadharPath = req.files.aadhar[0].path;

      // Delete old file if it exists
      if (formDoc.aadhar) {
        try {
          await fs.unlink(path.resolve(formDoc.aadhar));
          console.log("Old Aadhar file deleted");
        } catch (err) {
          console.warn("Could not delete old Aadhar:", err.message);
        }
      }

      updateData.aadhar = newAadharPath; // Save new file path
    } else {
      updateData.aadhar = formDoc.aadhar; // Retain old file if no new file uploaded
    }

    //  Handle PAN File Update
    if (req.files?.pan?.[0]) {
      const newPanPath = req.files.pan[0].path;

      // Delete old file if it exists
      if (formDoc.pan) {
        try {
          await fs.unlink(path.resolve(formDoc.pan));
          console.log("Old PAN file deleted");
        } catch (err) {
          console.warn("Could not delete old PAN:", err.message);
        }
      }

      updateData.pan = newPanPath; // Save new file path
    } else {
      updateData.pan = formDoc.pan; // Retain old file if no new file uploaded
    }

    //  Update MongoDB with the new data
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      message: "Form updated successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating form", error: error.message });
  }
}

const getAll = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error: error.message });
  }
}

const deleteAll = async (req, res) => {
  try {
    const formDoc = await Form.findById(req.params.id);
    if (!formDoc) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Delete associated files if they exist
    if (formDoc.aadhar) {
      try {
        await fs.unlink(path.resolve(formDoc.aadhar));
        console.log("Aadhar file deleted");
      } catch (err) {
        console.warn("Could not delete Aadhar file:", err.message);
      }
    }

    if (formDoc.pan) {
      try {
        await fs.unlink(path.resolve(formDoc.pan));
        console.log("PAN file deleted");
      } catch (err) {
        console.warn("Could not delete PAN file:", err.message);
      }
    }
    // Delete form from database
    await Form.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form", error: error.message });
  }
}
module.exports = { fileSubmitHandler, updateAadharPan, getAll, deleteAll };