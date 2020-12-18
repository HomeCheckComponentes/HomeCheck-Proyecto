import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tareas } from '../models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private baseUrl: string;
  formData: Tareas;
  private tareas: Tareas[];

  constructor(@Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
    this.baseUrl = baseUrl;
}


  crearTarea(tarea: Tareas) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Origin , Access-Control-* , X-Requested-With, Accept',
        'Content-Type': 'application/json,charset=utf-8',
        'Accept': 'application/json',
        'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
      })
    };
    return this.http.post(this.baseUrl + '/tareas/create', tarea, httpOptions)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
    );

  }


  listarTareas(){
    this.http.get(this.baseUrl + '/tareas/GetTareas')
      .toPromise().then(res => this.tareas = res as Tareas[])

  }
}
