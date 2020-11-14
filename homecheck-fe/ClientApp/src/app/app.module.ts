import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './Landing_page/landing-page/landing-page.component';
import { RegistroTareasComponent } from './Tareas/registro-tareas/registro-tareas.component';
import { ListarTareasComponent } from './Tareas/listar-tareas/listar-tareas.component';
import { RegistrarUsuarioComponent } from './usuarios/registrar-usuario/registrar-usuario.component';
import { ListarUsuariosfamiliaComponent } from './usuarios/listar-usuariosfamilia/listar-usuariosfamilia.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LandingPageComponent,
    RegistroTareasComponent,
    ListarTareasComponent,
    RegistrarUsuarioComponent,
    ListarUsuariosfamiliaComponent,
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'landingPage', component: LandingPageComponent },
      { path: 'usuario/registrar-usuario', component: RegistrarUsuarioComponent },
      { path: 'usuario/listar-usuarios-familia', component: ListarUsuariosfamiliaComponent }
    ])
  ],
  providers: [
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
