const router = require('express').Router();
const validateJWT = require("../middleware/validate-jwt");
const Vacation = require('../db').import('../models/vacation');

//Create Vacation
router.post('/create', validateJWT, async (req, res) => {
    const vacationEntry = {
        photo: req.body.photo,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        userId: req.user.id,
    }
    Vacation.create(vacationEntry)
        .then((entry) => res.status(200).json(entry))
        .catch((err) => res.status(500).json({ error: err }));
});

//Get All Entries
router.get("/", async (req, res) => {
    try {
        const entries = await VacationModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Get Entries By User
router.get("/getAllBlogsByUser", validateJWT, (req, res) => {
    Vacation.findAll({
        where: {userId: req.user.id},
        order: [['date', 'DESC']]
    })
    .then((vacations) => res.status(200).json(vacations))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/getAllBlogs", (req, res) => {
    Vacation.findAll({order: [['date', 'DESC']]})
    .then((vacations) => res.status(200).json(vacations))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/getAllBlogs", (req, res) => {
    Vacation.findAll()
    .then((vacations) => res.status(200).json(vacations))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get Entries By Title
router.get("/:title", async (req, res) => {
    const { title } = req.params;
    try {
        const results = await VacationModel.findAll({
            where: { title: title }
        });
        res.status(200).json( results );
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// -----  Update a Vacation  -----
router.put("/update/:id", validateJWT, (req, res) => {
    const updateVacation = {
        photo: req.body.photo,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description
    };
  
    const query = { where: { id: req.params.id } };      
  
    Vacation.update(updateVacation, query)
      .then((vacation) => res.status(200).json(vacation))
      .catch((err) => res.status(500).json({ error: err }));
});

//Delete
router.delete("/delete/:id", async (req, res) => {
    try{
        await Vacation.destroy({where: { id: req.params.id}});
        res.status(200).json({ message: "Vacation Removed "});
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

module.exports = router;