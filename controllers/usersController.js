const db = require("../models")

module.exports = {
    findAll: function(req, res){
        db.User
            .find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        db.User
            .create(req.body)
            .then(data => res.json(data))
            .catch(err => {
                res.status(422).json(err)
                console.log(err)
            })
    },
    findScoresByGameId: function(req, res) {
        db.User
          .find({gameid: req.params.id}).sort({hours: 1, minutes: 1, seconds: 1})
          .then(data => res.json(data))
          .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.User
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(data => res.json(data))
          .catch(err => res.status(422).json(err));
      },    
}