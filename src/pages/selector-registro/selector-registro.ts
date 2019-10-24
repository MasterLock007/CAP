import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { SignupPage } from "../signup/signup";
import { RegistroVeterinarioPage } from "../registro-veterinario/registro-veterinario";

@IonicPage()
@Component({
  selector: "page-selector-registro",
  templateUrl: "selector-registro.html"
})
export class SelectorRegistroPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SelectorRegistroPage");
  }

  usuario() {
    this.navCtrl.push(SignupPage);
  }

  veterinario() {
    this.navCtrl.push(RegistroVeterinarioPage);
  }
}
