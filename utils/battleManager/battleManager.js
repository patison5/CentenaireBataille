const Game = require('../game/game');
const Battles = require("../../models/battle");

const battles = new Map();


module.exports = {

    init(callback) {

        Battles.getBattlesBattleManager((data) => {
            for (let key in data.message) {
                let battle = data.message[key];
                battles.set(battle._id.toString(), new Game(battle._id));
            }
        });
        callback("BattleManager inited!");
    },

    addBattle(battleID) {
        battles.set(battleID, new Game(battleID));
    },
    getBattle(id) {
        return battles.get(id);
    },
    getBattles() {
        return battles;
    }
};