import { Component, OnInit } from '@angular/core';
import { FamiliaService } from '../../servicios/familia.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FamiliaList } from '../../models/familia-list';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listar-familias',
  templateUrl: './listar-familias.component.html',
  styleUrls: ['./listar-familias.component.css']
})
export class ListarFamiliasComponent implements OnInit {
  private familias: FamiliaList[];
  constructor(
    private service: FamiliaService,
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

}
