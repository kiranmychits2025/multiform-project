const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    state: String,
    district: String,
    addressline1: String,
    addressline2: String,
    pincode: String,
    aadhar: String, // Store file path
    pan: String,    // Store file path
    termsAccepted: Boolean
});

module.exports = mongoose.model('Form', formSchema);