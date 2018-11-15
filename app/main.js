import DuelController from "./components/DuelController.js";

class App {
  constructor() {
    this.controller = {
      duelCtrl: new DuelController()
    }
  }
}

window.app = new App()