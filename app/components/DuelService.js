import Dragon from "../models/dragon.js";
import Champion from "../models/champion.js";
import Game from "../models/game.js";

// @ts-ignore
let _duelAPI = axios.create({
  baseURL: "https://dragon-duel.herokuapp.com/api/"
})

let _dragons = []
let _activeDragon = {}
let _champions = []
let _activeChampion = {}
let _gameStarter = {}
let _game = {}

function handleError(err) {
  throw new Error(err)
}

export default class DuelService {

  get battleButton() {
    return _activeDragon.hasOwnProperty("id") && _activeChampion.hasOwnProperty("id")
  }
  get dragons() {
    return _dragons
  }
  get activeDragon() {
    return _activeDragon
  }
  get champions() {
    return _champions
  }
  get activeChampion() {
    return _activeChampion
  }
  get game() {
    return _game
  }

  getDragons(draw) {
    _duelAPI.get("dragons")
      .then(res => {
        _dragons = res.data.map(dragon => new Dragon(dragon))
        draw()
      }).catch(handleError)
  }

  getChampions(draw) {
    _duelAPI.get("champions")
      .then(res => {
        _champions = res.data.map(champ => new Champion(champ))
        draw()
      })
  }

  makeActiveChampion(champion) {
    _activeChampion = _champions[champion]
    _gameStarter.championId = `${_activeChampion.id}`
  }

  makeActiveDragon(dragon) {
    _activeDragon = _dragons[dragon]
    _gameStarter.dragonId = `${_activeDragon.id}`
  }

  startBattle(draw) {
    _duelAPI.post("games", _gameStarter)
      .then(res => {
        console.log(res.data.game)
        _game = new Game(res.data.game)
        draw()
      })
      .catch(handleError)
  }

  battle(attackStr, draw) {
    let id = "games/" + _game._id
    let at = { attack: attackStr }
    _duelAPI.put(id, at)
      .then(res => {
        _game = new Game(res.data)
        draw()
      }).catch(handleError)
  }

  deleteBattle(draw) {
    let id = "games/" + _game._id
    _duelAPI.delete(id)
      .then(res => {
        console.log("deleted")
        draw()
      })
      .catch(handleError)
  }
}