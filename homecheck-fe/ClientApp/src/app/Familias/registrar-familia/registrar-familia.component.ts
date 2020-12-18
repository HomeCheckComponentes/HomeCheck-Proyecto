import { Component, OnInit } from '@angular/core';
import { Familia } from '../../models/familia';
import { FamiliaList } from '../../models/familia-list';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
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

  private familia: Familia;
  private usuario: Usuario;
  public familiaForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;
  private registerComplete: boolean = false;
  private isSendingData: boolean = false;
  


  constructor(private service: FamiliaService,
    private serviceUsuario: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.familiaForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }


  get f() {
    return this.familiaForm.controls;
  }

  sanitizeData(data: FormGroup): FamiliaList {
    let nuevaFamilia: FamiliaList = new FamiliaList();
    nuevaFamilia.name = this.familiaForm.controls['name'].value;
    nuevaFamilia.correo = this.familiaForm.controls['correo'].value;
    return nuevaFamilia;
  }

  registrarFamilia() {
    this.isSendingData = true;
    console.log(this.sanitizeData(this.familiaForm));

    this.service.crearFamilia(this.sanitizeData(this.familiaForm))
      .subscribe(
        (response) => {
         
          console.log(response);
          let adminFamilia: Usuario = new Usuario();
          adminFamilia.username = this.familiaForm.controls['username'].value;
          adminFamilia.email = this.familiaForm.controls['email'].value;
          adminFamilia.password = this.familiaForm.controls['password'].value;
          adminFamilia.member = "adminFamilia";
          adminFamilia.usertype = "1";
          adminFamilia.idfamilia = response['id'];
          this.registrarUsuario(adminFamilia);
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

  registrarUsuario(userAdmin: Usuario) {
    console.log(userAdmin);

    this.serviceUsuario.postUsuario(userAdmin)
      .subscribe(
        (response) => {
          this.isSendingData = false;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.isSendingData = false;
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al registrar el usuario. Vuelva a intentarlo en unos minutos' };
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
