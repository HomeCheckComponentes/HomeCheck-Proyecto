import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { UsuarioList } from '../models/usuario-list';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  formData: UsuarioList;
  list: UsuarioList[];
  listUsuarios: Usuario[];
  private baseUrl: string;


  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
    this.baseUrl = baseUrl;
  }


  postUsuario(formData: Usuario) {
    return this.http.post(this.baseUrl + '/Usuario', formData);
  }

  putUsuario(id_user, id_familia : string) {
    return this.http.put(this.baseUrl + '/Usuario?id_familia=' + id_familia +
      '&id_user=' + id_user, null)
  }

  fillList() {
    this.http.get(this.baseUrl + '/Usuario')
      .toPromise().then(res => this.list = res as UsuarioList[])
  }

  obtenerUsuariosFamilia(id_familia: string): Observable<UsuarioList[]> {
    return this.http.get<UsuarioList[]>(this.baseUrl + '/Usuario/UsuariosFamilia?id_familia=' + id_familia);
  }

  obtenerMimembrosFamilia(id_familia: string): Observable<UsuarioList[]> {
    return this.http.get<UsuarioList[]>(this.baseUrl + '/Usuario/MimebrosFamilia?id_familia=' + id_familia);
  }

  obtenerAdminFamilia(id_familia: string) {
    let endpointUrl = this.baseUrl + '/Usuario/AdminFamilia?id_familia=' + id_familia;
    return this.http.get<Usuario>(endpointUrl);
  }


  deleteUsuario(id_familia, id_user: string) {
    return this.http.delete(this.baseUrl + '/Usuario?id_familia=' + id_familia + '&id_user=' + id_user)

  }
}
