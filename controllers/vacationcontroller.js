// const Express = require('express');
const router = require('express').Router();
//Check https://elevenfifty.instructure.com/courses/762/pages/12-dot-2-2-implementing-validatesession?module_item_id=67423
// const validateJWT = require("../middleware/validate-jwt");
// const { VacationModel } = require('../models')

//Create Vacation
router.post('/create', async (req, res) => {
	const { photo, title, date, description } = req.body.vacation;
	const { id } = req.user;
	const vacationEntry = {
		photo,
		title,
		date,
		description,
		userId: id
	}
	try {
		const newVacation = await VacationModel.create(vacationEntry);
		res.status(200).json(newVacation);
	} catch (err) {
		res.status(500).json({ error: err });
	}
	
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
router.get("/mine", async (req, res) => {
	let { id } = req.user;
	try {
		const userVacations = await VacationModel.findAll({
			where: {
				userId: id
			}
		});
		res.status(200).json(userVacations);
	} catch (err) {
		res.status(500).json({ error: err });
	}
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