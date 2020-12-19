import { Component, OnInit, Input  } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioList } from '../../models/usuario-list';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  @Input() usuario: Usuario;
  private usuarioUpdate: Usuario;
  private usuarioId: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.usuarioId = localStorage.getItem('id_user');
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.llenarUsuario();
  }

  llenarUsuario() {
    this.usuarioService.getUsuario(this.usuarioId)
      .subscribe(data => {
        this.usuario.id = data['id'];
        this.usuario.username = data['username'];
        this.usuario.email = data['email'];
        this.usuario.password = data['password'];
        this.usuario.member = data['member'];
        this.usuario.idfamilia = data['idFamilia'];
        this.usuario.usertype = data['usertype'];
      })
  }


  editarUsuario() {
    this.usuarioService.putUsuario(this.usuarioId, this.usuario)
      .subscribe(
        response => {
          this.router.navigate(['familias/listar-familias/perfil/' + this.usuario.idfamilia]);
        }
      )
  }

  cancelarEdicion() {
    this.router.navigate(['familias/listar-familias/perfil/' + this.usuario.idfamilia]);
  }

  irListarUsuarios() {
    this.router.navigate(['usuarios/usuarios-familia/' + sessionStorage.getItem('id_familia')]);
  }
}
