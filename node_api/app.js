const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require("cors");

//bring in routes
const postRoutes = require('./routes/inventory')


var corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", postRoutes); // work like a middleware



const port = 8080;
app.listen(port, () => {
	console.log(`A Node Js API is listening in port: ${port}`);
});