import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Familia } from '../models/familia';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
    formData: Familia;
    list: Familia[];
    listUsuarios: Familia[];
    private baseUrl: string;

    constructor(
      @Inject('BASE_URL') baseUrl: string,
      private http: HttpClient) {
      this.baseUrl = baseUrl;
     
    }

    crearFamilia(formData: Familia) {
      return this.http.post(this.baseUrl + '/familias', formData)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }
  
    obtenerFamilias() {
      let endpointUrl = this.baseUrl + '/familias';
      return this.http.get<Familia[]>(endpointUrl);
    }


    
}
