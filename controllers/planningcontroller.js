// const Express = require('express');
const router = require('express').Router();
// const router = Express.Router();
//Check https://elevenfifty.instructure.com/courses/762/pages/12-dot-2-2-implementing-validatesession?module_item_id=67423
const validateJWT = require("../middleware/validate-jwt");
// const { PlanningModel } = require('../models')
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
    .then((plans) => res.status(200).json(plans))//check here
    .catch((err) => res.status(500).json({ error: err }));
});

// router.get("/getAllBlogs", (req, res) => {
//     Planning.findAll()
//     .then((plans) => res.status(200).json(plans))
//     .catch((err) => res.status(500).json({ error: err }));
// });

//Get Entries By Title
// router.get("/:title", async (req, res) => {
//     const { title } = req.params;
//     try {
//         const results = await PlanningModel.findAll({
//             where: { title: title }
//         });
//         res.status(200).json( results );
//     } catch (err) {
//         res.status(500).json({ error: err })
//     }
// });

//Update Vacations
// router.put("/update/:entryId", async (req, res) => {
//  const { photo, title, date, description } = req.body.journal;
//  const vacationId = req.params.entryId;
//  const userId = req.user.id;

//  const query = {
//      where: {
//          id: vacationId,
//          userId: userId //Check here was "owner"
//      }
//  };
//  const updatedVacation = {
//      photo: photo,
//      title: title,
//      date: date,
//      description: description
//  };

//  try{
//      const update = await VacationModel.update(updatedVacation, query);
//      res.status(200).json(update);
//  } catch (err) {
//      res.status(500).json({ error: err });
//  }
// });
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


// router.get('/practice', validateJWT, (req, res) => {
//     res.send('Hey!! This is a practice route!')
// });


module.exports = router;