const router = require("express").Router()
const usersRoutes = require("./users")
const gameRoutes = require("./game")
const errlogRoutes = require("./errlog")

router.use("/users", usersRoutes)
router.use("/game", gameRoutes)
router.use("/errors", errlogRoutes)

module.exports = router