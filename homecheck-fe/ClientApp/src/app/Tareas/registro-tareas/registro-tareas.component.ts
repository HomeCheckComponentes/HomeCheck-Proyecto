import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Tareas } from '../../models/tareas.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TareasService } from '../../servicios/tareas.service';

@Component({
  selector: 'app-registro-tareas',
  templateUrl: './registro-tareas.component.html',
  styleUrls: ['./registro-tareas.component.css']
})
export class RegistroTareasComponent implements OnInit {

  currentDate = new Date();
  public tareaForm: FormGroup;
  private submitted: Boolean; 
  public tarea: Tareas = null;
  private isSendingData: boolean = false;
  private error: object = null;

  constructor(private service: TareasService) {
    
  }

  ngOnInit() {
    this.tareaForm = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      fechaAsignada: new FormControl('', Validators.required),
      fechaLimite: new FormControl('', Validators.required)
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
    nuevatarea.estado = "incompleto";
    nuevatarea.persona = '1';
    return nuevatarea;
  }

  registrarTarea() {

    

    this.service.crearTarea(this.sanitizeData(this.tareaForm))
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
    console.log(this.tareaForm.value);
    this.submitted = true;

    if (this.tareaForm.invalid) {
      window.scroll(0, 0);
      return;
    }

    this.registrarTarea();
  }


}
