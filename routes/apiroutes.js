const router = require("./htmlroutes");
const Exercises = require("../models/exercises.js");

router.get("/api/workouts", (req, res) => {
  Exercises.find({})
    .sort({ date: -1 })
    .then((dbExercises) => {
      //console.log(dbExercises);
      res.json(dbExercises);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Exercises.find({})
    .sort({ date: -1 })
    .then((dbExercises) => {
      res.json(dbExercises);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts/", ({ body }, res) => {
  //console.log(body);
  Exercises.create(body)
    .then((dbExercises) => {
      res.json(dbExercises);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  //console.log(req.body);
  const id = req.params.id;
  const workout = req.body;

  Exercises.findByIdAndUpdate(
    id,
    { $push: { exercises: workout } },
    { new: true }
  )

    .then((data) => {
      //console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
