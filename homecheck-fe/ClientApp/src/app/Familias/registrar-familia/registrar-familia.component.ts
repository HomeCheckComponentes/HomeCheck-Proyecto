import { Component, OnInit } from '@angular/core';
import { Familia } from '../../models/familia';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { FamiliaService } from '../../servicios/familia.service';

@Component({
  selector: 'app-registrar-familia',
  templateUrl: './registrar-familia.component.html',
  styleUrls: ['./registrar-familia.component.css']
})
export class RegistrarFamiliaComponent implements OnInit {

  public familiaForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  private registerComplete: boolean = false;
  private isSendingData: boolean = false;



  constructor(private service: FamiliaService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.familiaForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required])
    });

  }


  get f() {
    return this.familiaForm.controls;
  }

  sanitizeData(data: FormGroup): Familia {
    let nuevaFamilia: Familia = new Familia();
    nuevaFamilia.name = this.familiaForm.controls['name'].value;
    nuevaFamilia.correo = this.familiaForm.controls['correo'].value;;
    return nuevaFamilia;
  }

  registrarFamilia() {
    this.isSendingData = true;
    console.log(this.sanitizeData(this.familiaForm));

    this.service.crearFamilia(this.sanitizeData(this.familiaForm))
      .subscribe(
        (response) => {
          this.isSendingData = false;

        },
        (error) => {
          this.isSendingData = false;
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al registrar a la familia. Vuelva a intertarlo en unos minutos' };
          }

          window.scroll(0, 0);


        });
  }


  onSubmit() {
    console.log(this.familiaForm.value);
    this.submitted = true;

    if (this.familiaForm.invalid) {
      window.scroll(0, 0);
      return;
    }

    this.registrarFamilia();
  }
  
}
