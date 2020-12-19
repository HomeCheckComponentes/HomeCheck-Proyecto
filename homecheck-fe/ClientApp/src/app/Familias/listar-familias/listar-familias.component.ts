import { Component, OnInit } from '@angular/core';
import { FamiliaService } from '../../servicios/familia.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FamiliaList } from '../../models/familia-list';
import { ActivatedRoute } from '@angular/router';
import { Familia } from '../../models/familia';


@Component({
  selector: 'app-listar-familias',
  templateUrl: './listar-familias.component.html',
  styleUrls: ['./listar-familias.component.css']
})
export class ListarFamiliasComponent implements OnInit {
  private familias: FamiliaList[];
  private cambioFamilia: Familia;
  constructor(
    private service: FamiliaService,
    private serviceUsuario: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    }

  ngOnInit() {
    this.obtenerFamilias();
  }

  obtenerFamilias(): void {
    this.service.obtenerFamilias()
      .subscribe(data => this.familias = data);
  }


  public editar(familia: Familia) {
    localStorage.setItem('id_familia', familia.id);
    this.cambioFamilia = familia;
  }

  public completarModificar(cambioFamilia: Familia) {
    this.service.modificarFamilia(cambioFamilia).subscribe(res => {
      this.service.obtenerTodasFamilias();
    });
   
  }



  irPerfil(id: string) {
    localStorage.setItem('id_familia', id);
    this.router.navigate(['familias/listar-familias/', 'perfil', id]);
  }

  

  eliminar(familia: Familia) {

    this.service.eliminarFamilia(familia.id).subscribe(res => {
        this.serviceUsuario.eliminarUsuariosFamilia(familia.id).subscribe(res2 => {
          this.obtenerFamilias();
        })
    });
  }


 
}
