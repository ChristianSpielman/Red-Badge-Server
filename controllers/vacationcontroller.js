// const Express = require('express');
const router = require('express').Router();
//Check https://elevenfifty.instructure.com/courses/762/pages/12-dot-2-2-implementing-validatesession?module_item_id=67423
const validateJWT = require("../middleware/validate-jwt");
// const { VacationModel } = require('../models')
const Vacation = require('../db').import('../models/vacation');

//Create Vacation
router.post('/create', validateJWT, async (req, res) => {
	console.log(req);
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
		where: {userId: req.user.id}
	})
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

//Update Vacations
router.put("/update/:entryId", async (req, res) => {
	const { photo, title, date, description } = req.body.journal;
	const vacationId = req.params.entryId;
	const userId = req.user.id;

	const query = {
		where: {
			id: vacationId,
			userId: userId //Check here was "owner"
		}
	};

	const updatedVacation = {
		photo: photo,
		title: title,
		date: date,
		description: description
	};

	try{
		const update = await VacationModel.update(updatedVacation, query);
		res.status(200).json(update);
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

//Delete
router.delete("/delete/:id", async (req, res) => {
    const ownerId = req.user.id;
    const vacationId = req.params.id;

    try{
        const query = {
            where: {
                id: vacationId,
                owner: ownerId //Check here
            }
        };

        await vacationModel.destroy(query);
        res.status(200).json({ message: "Vacation Removed "});
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

// router.get('/practice', validateJWT, (req, res) => {
// 	res.send('Hey!! This is a practice route!')
// });

module.exports = router;