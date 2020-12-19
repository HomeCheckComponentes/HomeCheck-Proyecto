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
  public usertype: string;
  public usuario: Usuario;
  public loginForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      correo: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  sanitizeData(data: FormGroup): Usuario {
    let userLogin: Usuario = new Usuario();
    userLogin.email = this.loginForm.controls['correo'].value;
    userLogin.password = this.loginForm.controls['password'].value;
    return userLogin;
  }

  inicioSesion() {
    this.submitted = true;
    console.log(this.sanitizeData(this.loginForm));

    this.usuarioService.obtenerUsuario(this.sanitizeData(this.loginForm))
      .subscribe(
        (response) => {
          sessionStorage.setItem('id_user', response['id'])
          sessionStorage.setItem('id_familia', response['idFamilia'])
          localStorage.setItem('id_familia', response['idFamilia'])
          sessionStorage.setItem('username', response['username'])
          sessionStorage.setItem('usertype', response['usertype'])
          sessionStorage.setItem('member', response['member'])
          sessionStorage.setItem('correo', response['email'])
          this.usertype = response['usertype']
          this.validarTipoUsuario(this.usertype);
        },
        (error) => {
          console.log(error.error);
        }
      )
  }

  validarTipoUsuario(usertype: string) {
    switch (usertype) {
      case "1": //Admin total
        this.router.navigate(['/familias/listar-familias']);
        break;
      case "2": //admin_familia
        localStorage.setItem('id_familia', sessionStorage.getItem('id_familia'));
        this.router.navigate(['/familias/listar-familias/perfil/' + sessionStorage.getItem('id_familia')]);
        break;
      case "3": //usuario comun
        localStorage.setItem('id_familia', sessionStorage.getItem('id_familia'));
        this.router.navigate(['/tareas/lista-tareas']);
        break;
      default:
        sessionStorage.clear();
        this.router.navigate['/home'];
        break;
    }
  }
}
