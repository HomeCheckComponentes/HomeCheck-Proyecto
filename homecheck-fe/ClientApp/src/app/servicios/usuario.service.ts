import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { UsuarioList } from "../models/usuario-list";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/usuario";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";



@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  formData: UsuarioList;
  list: UsuarioList[];
  private idFamiliaUsuario: String;
  private usuario: Usuario;
  listUsuarios: Usuario[];
  private baseUrl: string;
  private idFamilia = localStorage.getItem("id_familia");

  constructor(@Inject("BASE_URL") baseUrl: string, private http: HttpClient,
    private router: Router,) {
    this.baseUrl = baseUrl;
  }

  postUsuario(formData: Usuario) {
    return this.http.post(this.baseUrl + "/usuario/Nuevo", formData);
  }

  putUsuario(id_user: string, usuario: Usuario) {
    return this.http.put(
      this.baseUrl + "/usuario/Update/" + id_user,
      usuario
    );
  }

  fillList() {
    this.http
      .get(this.baseUrl + "/usuario/Get")
      .toPromise()
      .then((res) => (this.list = res as UsuarioList[]));


  }

  obtenerUsuario(formData: Usuario) {
    return this.http.post(this.baseUrl + "/usuario/LoginUsuario", formData);

  }


  getUsuario(id: string) {
    return this.http.get(this.baseUrl + "/usuario/Get/"+ id);

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
