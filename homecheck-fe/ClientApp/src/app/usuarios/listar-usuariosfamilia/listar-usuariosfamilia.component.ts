import { Component, OnInit } from '@angular/core';
import { FamiliaService } from '../../servicios/familia.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Familia } from '../../models/familia';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioList } from '../../models/usuario-list';
import { Usuario } from '../../models/usuario';
import { Local } from 'protractor/built/driverProviders';


@Component({
  selector: 'app-listar-usuariosfamilia',
  templateUrl: './listar-usuariosfamilia.component.html',
  styleUrls: ['./listar-usuariosfamilia.component.css']
})
export class ListarUsuariosfamiliaComponent implements OnInit {

  public usuarios: UsuarioList[];
  public usuarioUpdate: Usuario;
  public familiaId: string = localStorage.getItem('id_familia');



  constructor(
    public service: FamiliaService, public usuarioService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuariosFamilia(this.familiaId)
      .subscribe(data => this.usuarios = data);
  }


  agregarUsuario() {
    this.router.navigate(['/usuarios/agregar-usuario/' + this.familiaId]);
  };

  eliminar(usuario: Usuario) {
    this.usuarioService.deleteUsuario(usuario.id).subscribe(res => {
      this.obtenerUsuarios();
    });
  }



  editarUsuario(id: string) {
    localStorage.setItem('id_user', id);
    this.router.navigate(['/usuarios/user/' + id]);
  }

  irPerfil() {
    this.router.navigate(['/familias/listar-familias/perfil/' + sessionStorage.getItem('id_familia')]);
  }

  irRegistrarUsuario() {
    this.router.navigate(['/usuarios/agregar-usuario/' + sessionStorage.getItem('id_familia')]);
  }

  irListarUsuarios() {
    this.router.navigate(['/usuarios/usuarios-familia/' + sessionStorage.getItem('id_familia')]);
  }
}
