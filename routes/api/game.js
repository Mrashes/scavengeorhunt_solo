const router = require("express").Router()
const GameController = require("../../controllers/gameController")

router.route("/")
.get(GameController.findAll)
.post(GameController.create)

router.route("/:id")
.get(GameController.findGameById)

module.exports = router;