import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { UsuarioList } from "../models/usuario-list";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/usuario";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  formData: UsuarioList;
  list: UsuarioList[];
  private idFamiliaUsuario: String; 
  listUsuarios: Usuario[];
  private baseUrl: string;
  private idFamilia = localStorage.getItem("id_familia");

  constructor(@Inject("BASE_URL") baseUrl: string, private http: HttpClient) {
    this.baseUrl = baseUrl;
  }

  postUsuario(formData: Usuario) {
    return this.http.post(this.baseUrl + "/usuario/Nuevo", formData);
  }

  putUsuario(id_user, id_familia: string, usuario: Usuario) {
    return this.http.put(
      this.baseUrl + "/usuario/Update" + id_user,
      this.formData
    );
  }

  fillList() {
    this.http
      .get(this.baseUrl + "/usuario/Get")
      .toPromise()
      .then((res) => (this.list = res as UsuarioList[]));

    
  }



  obtenerTodosUsuarios() {
    return this.http.get<UsuarioList[]>(this.baseUrl + '/usuario/Get');

  }


  obtenerUsuariosFamilia(id_familia: string): Observable<UsuarioList[]> {
    return this.http.get<UsuarioList[]>(this.baseUrl + "/usuario/UsuariosFamilia/" + id_familia);
  }

  obtenerMimembrosFamilia(id_familia: string): Observable<UsuarioList[]> {
    return this.http.get<UsuarioList[]>(
      this.baseUrl + "/usuario/MiembrosFamilia/" + id_familia
    );
  }

  obtenerAdminFamilia(id_familia: string) {
    let endpointUrl = this.baseUrl + "/usuario/AdminFamilia/" + id_familia;
    return this.http.get<Usuario>(endpointUrl);
  }


  deleteUsuario(id_user: string) {
    return this.http.delete(this.baseUrl + '/usuario/Usuario/' + id_user)

  }


  eliminarUsuariosFamilia(id_familia: string) {
    return this.http.delete(this.baseUrl + '/usuario/UsersFamilia/' + id_familia)
  }
}
