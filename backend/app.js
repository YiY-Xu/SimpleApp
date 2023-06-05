const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const queryRoutes = require('./routes/query');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/query', queryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});