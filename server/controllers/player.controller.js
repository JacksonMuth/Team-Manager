const Player = require('../models/player');

module.exports = {
    allPlayers: (req, res) => {
        Player.find({})
            .then(players => res.json({ message: "success", results: players }))
            .catch(err => res.json({ message: "error", results: err }))
    },

    onePlayer: (req, res) => {
        Player.findOne({ _id: req.params.id })
            .then(player => res.json({ message: "success", results: player }))
            .catch(err => res.json({ message: "error", results: err }))
    },

    newPlayer: (req, res) => {
        Player.create(req.body)
            .then(newPlayer => res.json({ message: "success", results: newPlayer}))
            .catch(err => res.json({ message: "error", results: err }))
    },

    editPlayer: (req, res) => {
        Player.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
            .then(player => res.json({ message: "success", results: player }))
            .catch(err => res.json({ message: "error", results: err }))

    },

    deletePlayer: (req, res) => {
        Player.findOneAndDelete({ _id: req.params.id })
            .then(player => res.json({ message: "success", results: player }))
            .catch(err => res.json({ message: "error", results: err }))
    }
}