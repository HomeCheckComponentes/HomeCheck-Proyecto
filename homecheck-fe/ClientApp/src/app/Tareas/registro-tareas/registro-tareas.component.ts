import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Tareas } from '../../models/tareas.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TareasService } from '../../servicios/tareas.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/usuario';
import { UsuarioList } from '../../models/usuario-list';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-registro-tareas',
  templateUrl: './registro-tareas.component.html',
  styleUrls: ['./registro-tareas.component.css']
})
export class RegistroTareasComponent implements OnInit {

  currentDate = new Date();
  public tareaForm: FormGroup;
  public submitted: Boolean; 
  public tarea: Tareas = null;
  public isSendingData: boolean = false;
  public error: object = null;
  public idFamiliaLocal: string = localStorage.getItem('id_familia');
  
  public id: string;

  public usuarios: UsuarioList[];
  public users: UsuarioList[];

  constructor(public service: TareasService, public usuarioService: UsuarioService,
    public router: Router,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.obtenerUsuarios(this.idFamiliaLocal);

    this.tareaForm = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      fechaAsignada: new FormControl('', Validators.required),
      fechaLimite: new FormControl('', Validators.required),
      persona: new FormControl()
    });
  }

  obtenerUsuarios(idFamilia: string) {
    this.usuarioService.obtenerUsuariosFamilia(idFamilia)
      .subscribe(data => {
        this.usuarios = data
        console.log(this.usuarios)
      });
  }
 
  get f() {
    return this.tareaForm.controls;
  }

  sanitizeData(data: FormGroup): Tareas {
    let nuevatarea: Tareas = new Tareas();
    nuevatarea.descripcion = this.tareaForm.controls['descripcion'].value;
    nuevatarea.fechaAsignada = this.tareaForm.controls['fechaAsignada'].value;
    nuevatarea.fechaLimite = this.tareaForm.controls['fechaLimite'].value;
    nuevatarea.estado = "0";
    nuevatarea.persona = this.tareaForm.controls['persona'].value;
    nuevatarea.id_familia = this.idFamiliaLocal;
    return nuevatarea;
  }

  registrarTarea() {
    this.service.crearTarea(this.sanitizeData(this.tareaForm))
      .subscribe(
        (response) => {
          this.isSendingData = false;
          this.router.navigate(['/tareas/lista-tareas']);
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
    console.log(this.tareaForm.value);
    this.submitted = true;

    if (this.tareaForm.invalid) {
      window.scroll(0, 0);
      return;
    }
    this.registrarTarea();
  }

  irPerfil() {
    this.router.navigate(['familias/listar-familias/perfil/' + sessionStorage.getItem('id_familia')]);
  }

  irRegistrarUsuario() {
    this.router.navigate(['usuarios/agregar-usuario/' + sessionStorage.getItem('id_familia')]);
  }

  irListarUsuarios() {
    this.router.navigate(['usuarios/usuarios-familia/' + sessionStorage.getItem('id_familia')]);
  }

}
