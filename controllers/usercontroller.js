const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const Users = require("../db").import("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateJWT = require("../middleware/validate-jwt");



router.post("/register", (req, res) => {
    Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        admin: false,
        // password: req.body.password
        password: bcrypt.hashSync(req.body.password, 11),
    })
    .then((user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({
            user: user,
            message: "User Created!",
            sessionToken: token,
        });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/admin", (req, res) => {
    Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        admin: true,
        // password: req.body.password
        password: bcrypt.hashSync(req.body.password, 11),
    })
    .then((user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({
            user: user,
            message: "User Created!",
            sessionToken: token,
        });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//Get All Users
router.get("/getAllUsers", validateJWT, (req, res) => {
	Users.findAll()
	.then((users) => res.status(200).json(users))
	.catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", (req, res) => {
    console.log(req.body)
    Users.findOne({ where: { email: req.body.email } }).then(
        (user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches){
                        let token = jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "1d",
                            }
                        );
                        res.status(200).json({
                        user: user,
                        message: "Successfully logged in!",
                        sessionToken: token,
                        });
                    } 
                    else {
                    res.status(502).send({ error: "Bad Gateway" });
                    }
                });
            } 
            else{
                res.status(500).send({ error: "User does not exist" });
            }
        },
        (err) => res.status(501).send({ error: "Failed to Process" })
    );
});

module.exports = router;