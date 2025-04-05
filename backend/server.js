const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api', formRoutes);

mongoose.connect('mongodb://localhost:27017/formdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.listen(5000, () => console.log('Server is running on port 5000'));