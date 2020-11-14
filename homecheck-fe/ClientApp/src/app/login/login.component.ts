import { Component, OnInit } from '@angular/core';
import { Usuario } from '../_models/usuario';
import { LoginService } from '../_services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private usuario: Usuario, private loginService: LoginService) {}

  ngOnInit() {
  }

  login() {
    this.usuario.email = "Hola!";
    console.log("login")
  }
}
