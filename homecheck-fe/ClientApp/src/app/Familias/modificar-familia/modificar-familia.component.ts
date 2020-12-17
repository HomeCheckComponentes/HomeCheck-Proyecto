import { Component, OnInit, Input  } from '@angular/core';
import { FamiliaService } from '../../servicios/familia.service';
import { Familia } from '../../models/familia';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-familia',
  templateUrl: './modificar-familia.component.html',
  styleUrls: ['./modificar-familia.component.css']
})
export class ModificarFamiliaComponent implements OnInit {
  private familiaService: FamiliaService;
  @Input() familiaSeleccionada: Familia;
  constructor(familiaService: FamiliaService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.familiaService = familiaService;
    this.familiaSeleccionada = new Familia();
  }

  ngOnInit() {
    this.llenarFamilia();
  }


  llenarFamilia() {
    let idFamilia: string = this.activatedRoute.snapshot.queryParams['familia'];
    let updatedFamilia = new Familia();
    updatedFamilia.id = idFamilia;

    this.familiaService.obtenerFamilia(updatedFamilia)
      .subscribe(data => {
        this.familiaSeleccionada = data
      });
  }

}
