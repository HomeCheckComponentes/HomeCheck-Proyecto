import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  email: string;
  password: string;

  login() {
    this.email = "Hola!";
  }
}
