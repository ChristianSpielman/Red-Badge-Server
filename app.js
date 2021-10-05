require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const dbConnection = require("./db");//added


const sequelize = require('./db');
sequelize.sync();

app.use(express.json());
app.use(cors());


let users = require("./controllers/usercontroller");//imports controllers
app.use("/users", users);//base url for user
// app.use(require("./middleware/validate-jwt"));//anything above this line is protected, anything below is not
let vacation = require("./controllers/vacationcontroller");//imports controllers
app.use("/vacation", vacation); //creates base url for vacation
let planning = require("./controllers/planningcontroller");//imports controllers
app.use("/planning", planning); // planning base url


dbConnection.authenticate()
	.then(() => dbConnection.sync())
	.then(() => {
		app.listen(process.env.PORT, () => console.log(`[Server]: App is listening on ${process.env.PORT}.`));
	})
	.catch((err) => {
		console.log(`[Server] has crashed: ${err}`);
	})

// app.listen(process.env.PORT, () => {
// 	console.log((`[Server]: App is listening on ${process.env.PORT}.`))
// });