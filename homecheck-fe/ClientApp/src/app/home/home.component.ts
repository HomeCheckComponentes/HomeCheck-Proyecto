import { Component, OnInit } from "@angular/core";
import { Usuario } from "../models/usuario";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuarioService } from "../servicios/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  private usuario: Usuario;
  private loginForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      correo: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
}
