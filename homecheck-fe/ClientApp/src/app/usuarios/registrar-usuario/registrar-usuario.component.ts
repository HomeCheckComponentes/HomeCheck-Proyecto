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
  private usuarioForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  private registerComplete: boolean = false;
  private isSendingData: boolean = false;
  private id_familia: string;
  public accion: string = "Creación usuario";



  constructor(
    private serviceUsuario: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) {
    //this.id_familia = JSON.parse(localStorage.getItem('id_familia')).usuario.idfamilia;
  }
  username: string;
  password: string;
  email: string;
  member: string;
  usertype: string;
  idfamilia: string;
  ngOnInit() {
    this.usuarioForm = new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.email]),
      UserType: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Member: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.usuarioForm.controls;
  }


  sanitizeData(data: FormGroup): Usuario {
    let nuevoUsuario: Usuario = new Usuario();
    nuevoUsuario.username = this.usuarioForm.controls['Username'].value;
    nuevoUsuario.email = this.usuarioForm.controls['Email'].value;
    nuevoUsuario.usertype = this.usuarioForm.controls['UserType'].value;
    nuevoUsuario.member = this.usuarioForm.controls['Member'].value;
    nuevoUsuario.password = this.usuarioForm.controls['Password'].value;
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
}
