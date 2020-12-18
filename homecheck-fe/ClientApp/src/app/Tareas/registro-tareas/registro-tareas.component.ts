import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-registro-tareas',
  templateUrl: './registro-tareas.component.html',
  styleUrls: ['./registro-tareas.component.css']
})
export class RegistroTareasComponent implements OnInit {

  currentDate = new Date();
  

  constructor() {
    
  }

  ngOnInit() {

    
  }

}
