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

  private idFamiliaLocal: string = localStorage.getItem('id_familia');

  constructor(private service: TareasService) { }

  ngOnInit() {

    this.obtenerTodo();  //TRAER POR IDFAMILIA
  }

  obtenerTodo() {

    return this.service.obtenerTareasFamilia(this.idFamiliaLocal);
   
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

    this.service.eliminarTarea(id).subscribe( res => { this.obtenerTodo(); }
    )
    console.log(id); 
  }

}
