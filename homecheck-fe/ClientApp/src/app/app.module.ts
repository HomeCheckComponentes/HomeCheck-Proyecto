import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegistrarUsuarioComponent } from './usuarios/registrar-usuario/registrar-usuario.component';
import { ListarUsuariosfamiliaComponent } from './usuarios/listar-usuariosfamilia/listar-usuariosfamilia.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegistrarUsuarioComponent,
    ListarUsuariosfamiliaComponent,
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '/registrar-usuario', component: RegistrarUsuarioComponent },
      { path: '/listar-usuarios-familia', component: ListarUsuariosfamiliaComponent }
    ])
  ],
  providers: [
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
