const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const entitiesRoutes = require('./routes/entities');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use the entities routes
app.use('/entities', entitiesRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});