import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { enableProdMode } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './Landing_page/landing-page/landing-page.component';
import { RegistroTareasComponent } from './Tareas/registro-tareas/registro-tareas.component';
import { ListarTareasComponent } from './Tareas/listar-tareas/listar-tareas.component';
import { RegistrarFamiliaComponent } from './Familias/registrar-familia/registrar-familia.component';
import { ListarFamiliasComponent } from './Familias/listar-familias/listar-familias.component';
import { RegistrarUsuarioComponent } from './usuarios/registrar-usuario/registrar-usuario.component';
import { ListarUsuariosfamiliaComponent } from './usuarios/listar-usuariosfamilia/listar-usuariosfamilia.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LandingPageComponent,
    RegistroTareasComponent,
    ListarTareasComponent,
    RegistrarFamiliaComponent,
    ListarFamiliasComponent,
    RegistrarUsuarioComponent,
    ListarUsuariosfamiliaComponent   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingPageComponent },
      { path: 'familias/listar-familias', component: ListarFamiliasComponent },
      { path: 'familias/registrar-familia', component: RegistrarFamiliaComponent },
      { path: 'usuarios/agregar-usuario', component: RegistrarUsuarioComponent },
      { path: 'usuarios/usuarios-familia', component: ListarUsuariosfamiliaComponent }
    ])
  ],
  providers: [
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
