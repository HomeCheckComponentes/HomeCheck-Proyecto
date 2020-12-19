import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { enableProdMode } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { LandingPageComponent } from "./Landing_page/landing-page/landing-page.component";
import { RegistroTareasComponent } from "./Tareas/registro-tareas/registro-tareas.component";
import { ListarTareasComponent } from "./Tareas/listar-tareas/listar-tareas.component";
import { NavFooterComponent } from "./nav-footer/nav-footer.component";
import { RegistrarFamiliaComponent } from "./Familias/registrar-familia/registrar-familia.component";
import { ListarFamiliasComponent } from "./Familias/listar-familias/listar-familias.component";
import { RegistrarUsuarioComponent } from "./usuarios/registrar-usuario/registrar-usuario.component";
import { ListarUsuariosfamiliaComponent } from "./usuarios/listar-usuariosfamilia/listar-usuariosfamilia.component";
import { ModificarFamiliaComponent } from "./Familias/modificar-familia/modificar-familia.component";
import { PerfilFamiliaComponent } from "./Familias/perfil-familia/perfil-familia.component";
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';
import { ListarTodasTareasComponent } from './Tareas/listar-todas-tareas/listar-todas-tareas.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LandingPageComponent,
    RegistroTareasComponent,
    ListarTareasComponent,
    NavFooterComponent,
    RegistrarFamiliaComponent,
    ListarFamiliasComponent,
    RegistrarUsuarioComponent,
    ListarUsuariosfamiliaComponent,
    ModificarFamiliaComponent,
    PerfilFamiliaComponent,
    ListarUsuariosComponent,
    EditarUsuariosComponent,
    ListarTodasTareasComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LandingPageComponent },
      { path: "familias/listar-familias", component: ListarFamiliasComponent },
      { path: "familias/registrar-familia",component: RegistrarFamiliaComponent},
      { path: "familias/listar-familias/perfil/:id",component: PerfilFamiliaComponent},
      { path: "registroTareas", component: RegistroTareasComponent },
      { path: "usuarios/agregar-usuario/:id_familia",component: RegistrarUsuarioComponent },
      { path: "usuarios/usuarios-familia/:id_familia", component: ListarUsuariosfamiliaComponent},      
      { path: "usuarios/user/:id", component: EditarUsuariosComponent},      
      { path: 'home', component: HomeComponent },
      { path: 'tareas/registro-tareas', component: RegistroTareasComponent },
      { path: 'usuarios', component: ListarUsuariosComponent },
      { path: 'tareas/lista-tareas', component: ListarTareasComponent },
      { path: 'tareas', component: ListarTodasTareasComponent },
    ])

  ],
  providers: [
      
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
