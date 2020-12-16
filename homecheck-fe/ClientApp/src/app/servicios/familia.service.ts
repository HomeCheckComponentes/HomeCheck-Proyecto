import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { FamiliaList } from '../models/familia-list';
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
    listFamilias: Familia[];
    private baseUrl: string;

    constructor(
      @Inject('BASE_URL') baseUrl: string,
      private http: HttpClient) {
      this.baseUrl = baseUrl;
     
    }

  crearFamilia(formData: FamiliaList) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Origin , Access-Control-* , X-Requested-With, Accept',
        'Content-Type': 'application/json,charset=utf-8',
        'Accept': 'application/json',
        'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
      })
    };
    return this.http.post(this.baseUrl + '/familias', formData, httpOptions)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
    }
  
    obtenerFamilias() {
      let endpointUrl = this.baseUrl + '/familias';
      return this.http.get<FamiliaList[]>(endpointUrl);
    }

    modificarFamilia(familia: Familia): Observable<any> {
      return this.http.put(this.baseUrl + '/familias', familia)
      }

      eliminarFamilia(id: string) {
        return this.http.delete(this.baseUrl + 'familias/?id=' + id)
    }

    obtenerTodasFamilias() {
      this.http.get(this.baseUrl + '/familias')
        .toPromise().then(res => this.listFamilias = res as Familia[])
    }
    
}
