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

  constructor(private service: TareasService) { }

  ngOnInit() {

    this.obtenerTodo(); 
  }

  obtenerTodo() {

    return this.service.listarTareas(); 
  }

  editar(tarea: Tareas) {

  }

}
