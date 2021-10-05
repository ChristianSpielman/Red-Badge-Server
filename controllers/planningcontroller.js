const router = require('express').Router();
const validateJWT = require("../middleware/validate-jwt");
const Planning = require('../db').import('../models/planning');

//Create Vacation
router.post('/create', validateJWT, async (req, res) => {
    console.log(req.body);
    const planningEntry = {
        photo: req.body.photo,
        title: req.body.title,
        date: req.body.date,
        toDo: req.body.toDo,
        userId: req.user.id,
    }
    Planning.create(planningEntry)
        .then((entry) => res.status(200).json(entry))
        .catch((err) => res.status(500).json({ error: err }));
});

//Get All Entries
router.get("/", async (req, res) => {
    try {
        const entries = await Planning.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Get Entries By User
router.get("/getAllPlansByUser", validateJWT, (req, res) => {
    Planning.findAll({
        where: {userId: req.user.id}
    })
    .then((plans) => res.status(200).json(plans))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Update a Vacation  -----
router.put("/update/:id", validateJWT, (req, res) => {
    console.log(req.body, req.params)
    const updatePlans = {
        photo: req.body.photo,
        title: req.body.title,
        date: req.body.date,
        toDo: req.body.toDo
    };
  
    const query = { where: { id: req.params.id } };      
  
    Planning.update(updatePlans, query)
      .then((plans) => res.status(200).json(plans))
      .catch((err) => res.status(500).json({ error: err }));
});

//Delete
router.delete("/delete/:id", async (req, res) => {
    try{
        await Planning.destroy({where: { id: req.params.id}});
        res.status(200).json({ message: "Plan Removed "});
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

module.exports = router;