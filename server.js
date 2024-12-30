const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const infoController = require("./controller/informationController");

const port = 3000;

//MIDDLEWARE
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

  
app.get("/banner", infoController.getListBanner)
app.get("/services", infoController.getListServices)

app.use("/", require("./routes/userAuth"));
app.use("/", require("./routes/transactionAuth"));

//PORT
app.listen(port, () => {
    console.log("Server is running properly")
})