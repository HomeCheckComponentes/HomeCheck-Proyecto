import { Component, OnInit } from '@angular/core';
import { Familia } from '../../models/familia';
import { NgForm } from '@angular/forms';
import { FamiliaService } from '../../servicios/familia.service';

@Component({
  selector: 'app-registrar-familia',
  templateUrl: './registrar-familia.component.html',
  styleUrls: ['./registrar-familia.component.css']
})
export class RegistrarFamiliaComponent implements OnInit {

  public formData: Familia;


  constructor(private service: FamiliaService) { }


  ngOnInit() {
    this.resetForm()
  }



  onSubmit(formData: NgForm) {
    console.log(formData.value)
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }


    this.formData = {
      id: '5',
      nombre: '',
      correo: '',

    }

  }
}
