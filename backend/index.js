const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dataRoutes = require('./routes/data');
require('dotenv').config(); // Load .env

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/data', dataRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('done!!! MongoDB connected to Atlas'))
.catch(err => console.error('error!! MongoDB error:', err));

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
