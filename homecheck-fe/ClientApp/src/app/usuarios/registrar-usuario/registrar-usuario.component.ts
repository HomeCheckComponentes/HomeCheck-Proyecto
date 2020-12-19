import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  public usuarioForm: FormGroup;
  public submitted: boolean = false;
  public error: object = null;
  public registerComplete: boolean = false;
  public isSendingData: boolean = false;
  public id_familia: string;
  public accion: string = "Creación usuario";



  constructor(
    public serviceUsuario: UsuarioService,
    public router: Router,
    public route: ActivatedRoute) {
    this.id_familia = localStorage.getItem('id_familia');
  }
 
  ngOnInit() {
    this.usuarioForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      member: new FormControl('', [Validators.required]),
      usertype: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }


  sanitizeData(data: FormGroup): Usuario {
    let nuevoUsuario: Usuario = new Usuario();
    nuevoUsuario.username = this.usuarioForm.controls['username'].value;
    nuevoUsuario.email = this.usuarioForm.controls['email'].value;
    nuevoUsuario.usertype = this.usuarioForm.controls['usertype'].value;
    nuevoUsuario.member = this.usuarioForm.controls['member'].value;
    nuevoUsuario.password = this.usuarioForm.controls['password'].value;
    nuevoUsuario.idfamilia = this.id_familia;

    return nuevoUsuario;
  }



  registrarUsuario() {
    this.isSendingData = true;
    console.log(this.sanitizeData(this.usuarioForm));

    this.serviceUsuario.postUsuario(this.sanitizeData(this.usuarioForm))
      .subscribe(
        (response) => {
          this.isSendingData = false;
          this.router.navigate(['/familias/listar-familias/perfil/' + this.id_familia]);
        },
        (error) => {
          this.isSendingData = false;
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al registrar el usuario. Vuelva a intentarlo en unos minutos' };
          }

          window.scroll(0, 0);


        });
  }


  onSubmit() {
    this.submitted = true;

    if (this.usuarioForm.invalid) {
      window.scroll(0, 0);
      return;
    }

    this.registrarUsuario();
  }


  irPerfil() {
    this.router.navigate(['familias/listar-familias/perfil/' + sessionStorage.getItem('id_familia')]);
  }

  irListarUsuarios() {
    this.router.navigate(['usuarios/usuarios-familia/' + sessionStorage.getItem('id_familia')]);
  }
}
