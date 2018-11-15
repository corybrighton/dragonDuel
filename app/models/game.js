export default class Game {
  constructor(data) {
    this._id = data._id
    this._dragon = data._dragon
    this._champion = data._champion
    this.history = data.history
  }
}