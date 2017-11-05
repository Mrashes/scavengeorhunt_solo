const db = require("../models")

module.exports = {
    findAll: function(req, res){
        db.Game
            .find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    findGameById: function(req, res){
        db.Game
            .find({gameid: req.params.id})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },    
    create: function(req, res){
        db.Game
            .create(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
}