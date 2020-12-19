import { Component, OnInit } from '@angular/core';
import { Tareas } from '../../models/tareas.model';
import { TareasService } from '../../servicios/tareas.service';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.css']
})
export class ListarTareasComponent implements OnInit {

  public selectedTarea: Tareas = null;
  private isChecked: Boolean; 

  constructor(private service: TareasService) { }

  ngOnInit() {

    this.obtenerTodo(); 
  }

  obtenerTodo() {

    return this.service.listarTareas();
   
  }

  editar(tarea: Tareas) {

  }

  changed(tarea: Tareas, id: string) {

    console.log(tarea, id);

    this.service.modificarTarea(tarea, id).subscribe(res => { this.obtenerTodo(); }); 
  }

  borrarTarea(id: string) {

    this.service.eliminarTarea(id).subscribe( res => { this.obtenerTodo(); }
    )
    console.log(id); 
  }

}
