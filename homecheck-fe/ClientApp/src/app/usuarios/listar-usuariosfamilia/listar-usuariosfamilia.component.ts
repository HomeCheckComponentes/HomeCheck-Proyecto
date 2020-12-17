import { Component, OnInit } from '@angular/core';
import { FamiliaService } from '../../servicios/familia.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Familia } from '../../models/familia';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioList } from '../../models/usuario-list';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-listar-usuariosfamilia',
  templateUrl: './listar-usuariosfamilia.component.html',
  styleUrls: ['./listar-usuariosfamilia.component.css']
})
export class ListarUsuariosfamiliaComponent implements OnInit {

  private usuarios: UsuarioList[];
  private usuarioUpdate: Usuario;
  private familiaId: string = this.activatedRoute.snapshot.queryParams['id_familia'];


  constructor(
    private service: FamiliaService, private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuariosFamilia(this.familiaId)
      .subscribe(data => this.usuarios = data);
  }


  public editar(usuario: Usuario) {

    this.usuarioUpdate = usuario;
  }

  public completarModificar(usuario: Usuario) {
    this.usuarioService.putUsuario(usuario.id, usuario.idfamilia, usuario).subscribe(res => {
      this.service.obtenerTodasFamilias();
    });

  }

  irPerfil(id: string) {
    this.router.navigate(['familias/listar-familias/', 'perfil', id]);
  }



  eliminar(id: string) {
    this.service.eliminarFamilia(id).subscribe(res => {
      this.service.obtenerTodasFamilias();
    });
  }

}
