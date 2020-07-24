  
const controller = require("../controllers/player.controller");

module.exports = function(app) {
    app.get('/api/players', controller.allPlayers);

    app.get('/api/players/:id', controller.onePlayer);

    app.post('/api/players', controller.newPlayer);

    app.put('/api/players/:id', controller.editPlayer);

    app.delete('/api/players/:id', controller.deletePlayer);
}