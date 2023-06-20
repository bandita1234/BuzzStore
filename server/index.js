const express = require('express');
const dotenv = require("dotenv").config();
const connectToMongo = require('./config/db');
const authRouter = require('./routes/authRoute');
connectToMongo();
var cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 4000 ;

app.use(express.json());
app.use(cookieParser());


app.use('/api/user',authRouter);
// app.use('/api/notes',require('./routes/notes'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})