import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamiliaService } from '../../servicios/familia.service';
import { Familia } from '../../models/familia';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioList } from '../../models/usuario-list';


@Component({
  selector: 'app-perfil-familia',
  templateUrl: './perfil-familia.component.html',
  styleUrls: ['./perfil-familia.component.css']
})
export class PerfilFamiliaComponent implements OnInit {
  private familiaActual: Familia;
  private usuarios: UsuarioList[];
  private familiaId: number = this.activatedRoute.snapshot.queryParams['id_familia'];


  constructor(private familiaService: FamiliaService, private usuariosService: UsuarioService,
    private activatedRoute: ActivatedRoute) {
    this.familiaActual = new Familia();
  }

  ngOnInit() {
    this.llenarFamilia();
  }

  llenarSucursales() {
    this.usuariosService.obtenerUsuariosFamilia(this.familiaActual.id)
      .subscribe(data => this.usuarios = data);
  }

  llenarFamilia() {
    let familiaId: string = this.activatedRoute.snapshot.queryParams['id_familia'];
    let familia = new Familia();
    familia.id = familiaId;

    this.familiaService.obtenerFamilia(familia)
      .subscribe(data => {
        this.familiaActual = data
        this.llenarUsuarioFamilia();
      });
  }

}
