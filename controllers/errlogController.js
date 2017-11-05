const db = require("../models")

module.exports = {
    findAll: function(req, res){
        db.ErrLog
            .find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        db.ErrLog
            .create(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
}