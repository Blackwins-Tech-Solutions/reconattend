// requiring features
const mongodb = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const AppError = require("./helper/appError");
const errorHandler = require("./helper/errorHandler");
const headers = require("./helper/headers");
const cors = require("cors");
//const router = require("./routes/users.routes");

const bodyParser = require("body-parser");
const app = express();
const port = process.env.port;

//const Userrouter = require("./routes/users.routes");

//body-parser config;  
//register the enpoints  
app.use(cors())
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded()); 
app.use(bodyParser.urlencoded({ extended: false }));


// for testing index page 
app.get("/", (req, res) => {
    res.send(`<h1>Welcome To our ReconAttendPlus App Attendance Module!</h1>`)
});
//app.use(router)

// app.use("/api/user", Userrouter);

// node js apperror class (error) extanding  
app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.use(headers);
// using errors handler
app.use(errorHandler);




app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});


module.exports = app;