import { Component, OnInit } from '@angular/core'
import { FamiliaService } from '../../servicios/familia.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Familia } from '../../models/familia';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioList } from '../../models/usuario-list';
import { Usuario } from '../../models/usuario';
import { strict } from 'assert';
;

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  public usuariosObservable: Observable<UsuarioList[]>;
  public usuarios: UsuarioList[];
  public users: UsuarioList[];
  public usuarioUpdate: Usuario;
  public familiaId: string = localStorage.getItem('id_familia');
  public familia: Observable<Familia>;
  public id: string;

  constructor(
    public serviceFamilia: FamiliaService, public usuarioService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.obtenerUsuarios();
  }


  obtenerUsuarios(): void {
    
    this.usuarioService.obtenerTodosUsuarios()
      .subscribe(data => {
        data.forEach(u => {
          this.id = u['idFamilia'];
          let familia = new Familia();
          familia.id = this.id;
          this.serviceFamilia.obtenerFamilia(familia)
            .subscribe(dato => {
              u['idFamilia'] = dato.name
            });
        })

        this.usuarios = data
      });

    console.log(this.usuarios);
    
  }



  eliminar(usuario: UsuarioList) {
    this.usuarioService.deleteUsuario(usuario.id).subscribe(res => {
      this.obtenerUsuarios();
    });
   
  }



}
