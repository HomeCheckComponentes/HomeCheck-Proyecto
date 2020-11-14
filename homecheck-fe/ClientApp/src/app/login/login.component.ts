import { Component, OnInit } from '@angular/core';
import { Usuario } from '../_models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }
  constructor(private usuario: Usuario) {}

  login() {
    this.usuario.email = "Hola!";
  }
}
