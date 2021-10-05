require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const dbConnection = require("./db");


const sequelize = require('./db');
sequelize.sync();

app.use(express.json());
app.use(cors());


let users = require("./controllers/usercontroller");
app.use("/users", users);
let vacation = require("./controllers/vacationcontroller");
app.use("/vacation", vacation);
let planning = require("./controllers/planningcontroller");
app.use("/planning", planning);


dbConnection.authenticate()
	.then(() => dbConnection.sync())
	.then(() => {
		app.listen(process.env.PORT, () => console.log(`[Server]: App is listening on ${process.env.PORT}.`));
	})
	.catch((err) => {
		console.log(`[Server] has crashed: ${err}`);
	})