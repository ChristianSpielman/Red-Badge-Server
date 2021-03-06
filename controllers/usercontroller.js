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

//Update User Info
router.put("/update/:id", validateJWT, (req, res) => {
    const updateUsers={
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
};
    const query = { where: {id: req.params.id} };
    Users.update(updateUsers, query)
      .then((user) => res.status(201).json({ message: `${user} records updated` }))
      .catch((err) => res.status(500).json({ error: err }));
});

//Delete
router.delete("/delete/:id", async (req, res) => {
    try{
        await Users.destroy({where: { id: req.params.id}});
        res.status(200).json({ message: "User Removed "});
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

router.post("/login", (req, res) => {
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