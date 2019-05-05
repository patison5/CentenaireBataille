const Game = require('../game/game');

const battles = new Map();
module.exports = {

    addBattle(battleID) {
        battles.set(battleID, new Game.Game(battleID));
    },
    getBattle(id) {
        return battles.get(id);
    },
    getBattles() {
        return battles;
    }
};