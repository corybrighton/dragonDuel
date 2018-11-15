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
  <button>Start Battle</button>`
}

function _drawBattle() {

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

}