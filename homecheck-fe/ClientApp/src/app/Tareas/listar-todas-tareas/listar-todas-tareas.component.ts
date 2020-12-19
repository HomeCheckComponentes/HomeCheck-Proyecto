import { Component, OnInit } from '@angular/core';
import { Tareas } from '../../models/tareas.model';
import { TareasService } from '../../servicios/tareas.service';

@Component({
  selector: 'app-listar-todas-tareas',
  templateUrl: './listar-todas-tareas.component.html',
  styleUrls: ['./listar-todas-tareas.component.css']
})
export class ListarTodasTareasComponent implements OnInit {
  public selectedTarea: Tareas = null;

  public isChecked: Boolean; 
  constructor(public service: TareasService) { }

  ngOnInit() {

    this.obtenerTodo(); 
  }

  obtenerTodo() {

    return this.service.listarTareas();

  }

  changed(tarea: Tareas, id: string) {

    console.log(tarea, id);

    if (tarea.estado == '0') {
      tarea.estado = '1';
    } else {
      tarea.estado = '0';
    }

    this.service.modificarTarea(tarea, id).subscribe(res => { this.obtenerTodo(); });
  }

  borrarTarea(id: string) {

    this.service.eliminarTarea(id).subscribe(res => { this.obtenerTodo(); }
    )
    console.log(id);
  }

}
