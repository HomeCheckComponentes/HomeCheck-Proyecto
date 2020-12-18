import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../servicios/tareas.service';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.css']
})
export class ListarTareasComponent implements OnInit {

  constructor(private service: TareasService) { }

  ngOnInit() {

    this.obtenerTodo(); 
  }

  obtenerTodo() {

    return this.service.listarTareas(); 
  }

}
