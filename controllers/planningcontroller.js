const Express = require('express');
const router = Express.Router();
//Check https://elevenfifty.instructure.com/courses/762/pages/12-dot-2-2-implementing-validatesession?module_item_id=67423
// const validateJWT = require("../middleware/validate-jwt");
// const { PlanningModel } = require('../models')


//Create Vacation
router.post('/create', async (req, res) => {
	const { title, date, itinerary, items, description } = req.body.planning;
	const { id } = req.user;
	const planningEntry = {
        title,
		date,
        itinerary,
        items,
		description,
		userId: id
	}
	try {
		const newPlan = await PlanningModel.create(planningEntry);
		res.status(200).json(newPlan);
	} catch (err) {
		res.status(500).json({ error: err });
	}
	
});

//Get All Entries
router.get("/", async (req, res) => {
    try {
        const entries = await PlanningModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Get Entries By User
router.get("/mine", async (req, res) => {
	let { id } = req.user;
	try {
		const userPlans = await PlanningModel.findAll({
			where: {
				userId: id
			}
		});
		res.status(200).json(userPlans);
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

//Get Entries By Title
router.get("/:title", async (req, res) => {
	const { title } = req.params;
	try {
		const results = await PlanningModel.findAll({
			where: { title: title }
		});
		res.status(200).json( results );
	} catch (err) {
		res.status(500).json({ error: err })
	}
});

//Update Vacations
router.put("/update/:entryId", async (req, res) => {
	const { title, date, description } = req.body.journal;
	const planId = req.params.entryId;
	const userId = req.user.id;

	const query = {
		where: {
			id: planId,
			userId: userId //Check here was "owner"
		}
	};

	const updatedPlans = {
		title: title,
		date: date,
        itinerary: itinerary,
        toDO: toDo,
		description: description
	};

	try{
		const update = await PlanningModel.update(updatedPlans, query);
		res.status(200).json(update);
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

//Delete
router.delete("/delete/:id", async (req, res) => {
    const ownerId = req.user.id;
    const planId = req.params.id;

    try{
        const query = {
            where: {
                id: planId,
                owner: ownerId
            }
        };

        await vacationModel.destroy(query);
        res.status(200).json({ message: "Vacation Plans Removed "});
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

// router.get('/practice', validateJWT, (req, res) => {
//     res.send('Hey!! This is a practice route!')
// });


module.exports = router;