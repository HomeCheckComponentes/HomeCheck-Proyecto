import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamiliaService } from '../../servicios/familia.service';
import { Familia } from '../../models/familia';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioList } from '../../models/usuario-list';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-familia',
  templateUrl: './perfil-familia.component.html',
  styleUrls: ['./perfil-familia.component.css']
})
export class PerfilFamiliaComponent implements OnInit {
  public familiaActual: Familia;
  public usuarios: UsuarioList[];
  public familiaId: string = localStorage.getItem('id_familia');
public userType: string;



  constructor(public familiaService: FamiliaService, public usuariosService: UsuarioService,
    public activatedRoute: ActivatedRoute, public router: Router) {
    this.familiaActual = new Familia();
  }

  ngOnInit() {

    this.userType = sessionStorage.getItem('usertype');

    this.llenarFamilia();
  }

  llenarUsuarioFamilia() {
    this.usuariosService.obtenerUsuariosFamilia(this.familiaActual.id)
      .subscribe(data => this.usuarios = data);
  }

  llenarFamilia() {
    let familiaId: string = localStorage.getItem('id_familia');
    let familia = new Familia();
    familia.id = familiaId;

    this.familiaService.obtenerFamilia(familia)
      .subscribe(data => {
        this.familiaActual = data
        this.llenarUsuarioFamilia();
      });
  }

  agregarUsuario() {
    this.router.navigate(['/usuarios/agregar-usuario/' + this.familiaId]);
  };


  eliminar(usuario: Usuario) {
    this.usuariosService.deleteUsuario(usuario.id).subscribe(res => {
      this.llenarUsuarioFamilia();
    });
  }



  editarUsuario(id: string) {
    localStorage.setItem('id_user', id);
    this.router.navigate(['/usuarios/user/' + id]);
  }

  irPerfil() {
    this.router.navigate(['familias/listar-familias/perfil/' + this.familiaId]);
  }


}
