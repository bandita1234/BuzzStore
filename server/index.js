const express = require('express');
const dotenv = require("dotenv").config();
const connectToMongo = require('./config/db');
const authRouter = require('./routes/authRoute');
const blogRouter = require('./routes/blogRoute')
const productRouter = require('./routes/productRoute');
const categoryRouter = require('./routes/prodCategoryRoute');
const blogcategoryRouter = require('./routes/blogCategoryRoute');
const brandRouter = require('./routes/brandRoute');
const couponRouter = require('./routes/couponRoute')
const colorRouter = require('./routes/colorRoute')
const enquiryRouter = require('./routes/enquiryRoute')
const morgan = require('morgan')
connectToMongo();
var cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 4000 ;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


app.use('/api/user',authRouter);
app.use('/api/product',productRouter);
app.use('/api/blog',blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enquiryRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})