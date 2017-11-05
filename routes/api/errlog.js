const router = require("express").Router()
const ErrLogController = require("../../controllers/errlogController")

router.route("/")
.get(ErrLogController.findAll)
.post(ErrLogController.create)


module.exports = router;