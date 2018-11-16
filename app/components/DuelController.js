import DuelService from "./DuelService.js";

let _ds = new DuelService()

function _drawDragon() {
  let templ = '<div value="">Choose a Dragon</div>'
  _ds.dragons.forEach(dragon => {
    templ += `<div onclick="app.controller.duelCtrl.makeDragonActive(${dragon.id})">
    <img class="small-images" src="${dragon.imgUrl}">
    ${dragon.name}</div>`
  });
  document.getElementById('dragons-menu').innerHTML = templ
}

function _drawChampion() {
  let templ = '<div value="">Choose Your Champion</div>'
  _ds.champions.forEach(champion => {
    templ += `<div onclick="app.controller.duelCtrl.makeChampionActive(${champion.id})">
    <img class="small-images" src="${champion.imgUrl}">${champion.name}</div>`
  });
  document.getElementById('champions-menu').innerHTML = templ
}

function _drawYourChampion() {
  let champion = _ds.activeChampion
  document.getElementById("your-champion").innerHTML = `<h1>Your Champion ${champion.name}</h1>
        <img class="img-fluid image-selected" src="${champion.imgUrl}"
          alt="">
        <h5>${champion.class} ${champion.race} - HP: ${champion.hp}</h5>`
}

function _drawYourDragon() {
  let dragon = _ds.activeDragon
  document.getElementById("your-dragon").innerHTML = `<h1>Takes on ${dragon.name}</h1>
        <img class="img-fluid image-selected" src="${dragon.imgUrl}"
          alt="">
        <h5> HP: ${dragon.maxHP}</h5>`
}
function _drawBattleButton() {
  document.getElementById("start-button").innerHTML = `
  <button onclick="app.controller.duelCtrl.beginBattle()">Start Battle</button>`
}

function _drawBattle() {
  let game = _ds.game
  let champion = game._champion
  let dragon = game._dragon
  let battleMoves = Object.keys(champion.attacks)
  document.getElementById("game").innerHTML = `
  <div class="row">
      <div class="col-6 text-center d-flex flex-column" >
        <h1>HP:${champion.hp}</h1>
        <img class="img-fluid image-selected" src="${champion.imgUrl}" alt="">
        
        <button class="btn btn-danger" onclick="app.controller.duelCtrl.attack('${battleMoves[0]}')">${battleMoves[0]}</button>
        <button class="btn btn-danger" onclick="app.controller.duelCtrl.attack('${battleMoves[1]}')">${battleMoves[1]}</button>
        <button class="btn btn-danger" onclick="app.controller.duelCtrl.attack('${battleMoves[2]}')">${battleMoves[2]}</button>

      </div>
      <div class="col-6 text-center" id="your-dragon">
        <h1>HP:${dragon.currentHP}</h1>
        <img class="img-fluid image-selected" src="${dragon.imgUrl}" alt="">
      </div>
      <button onclick="app.controller.duelCtrl.deleteBattle()">Delete Game</button>
    </div>
  `
}

function _deleteBattle() {
  document.getElementById("game").innerHTML = `
  <h1>Deleted</h1>
  `
}

export default class DuelController {
  constructor() {
    _ds.getDragons(_drawDragon)
    _ds.getChampions(_drawChampion)
  }

  makeDragonActive(dragon) {
    _ds.makeActiveDragon(dragon)
    _drawYourDragon()
    if (_ds.battleButton) {
      _drawBattleButton()
    }
  }

  makeChampionActive(champion) {
    _ds.makeActiveChampion(champion)
    _drawYourChampion()
    if (_ds.battleButton) {
      _drawBattleButton()
    }
  }

  beginBattle() {
    _ds.startBattle(_drawBattle)
  }

  attack(attack) {
    _ds.battle(attack, _drawBattle)
  }

  deleteBattle() {
    _ds.deleteBattle(_deleteBattle)
  }
}