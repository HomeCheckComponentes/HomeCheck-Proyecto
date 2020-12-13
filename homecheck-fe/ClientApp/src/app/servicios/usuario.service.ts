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


  constructor() { }
}
