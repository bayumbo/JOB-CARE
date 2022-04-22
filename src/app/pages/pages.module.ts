import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AdmininicioComponent } from './empleadores/admininicio/admininicio.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { VerOfertasComponent } from './empleadores/ver-ofertas/ver-ofertas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarOfertasComponent } from './empleadores/editar-ofertas/editar-ofertas.component';
import { PlanesComponent } from './empleadores/planes/planes.component';
import { NgxSlideModalModule } from 'ngx-slide-modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HojavidaFormularioComponent } from './empleados/hojavida-formulario/hojavida-formulario.component';
import { AgmCoreModule } from '@agm/core';
import { EditarHojavidaComponent } from './empleados/editar-hojavida/editar-hojavida.component';
import { VerHojavidaComponent } from './empleados/ver-hojavida/ver-hojavida.component';
import { PlanEmpleadosComponent } from './empleados/plan-empleados/plan-empleados.component';
import { AdministradorComponent } from './administracion/administrador/administrador.component';
import { CrearCursosComponent } from './administracion/crear-cursos/crear-cursos.component';
import { VerCursosComponent } from './administracion/ver-cursos/ver-cursos.component';
import { PerfilesComponent } from './empleadores/perfiles/perfiles.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { OfertasPublicadasComponent } from './empleados/ofertas-publicadas/ofertas-publicadas.component';
import { PerfilesAdminComponent } from './administracion/perfiles-admin/perfiles-admin.component';
import { OfertasAdminComponent } from './administracion/ofertas-admin/ofertas-admin.component';
import { EditarCursosComponent } from './administracion/editar-cursos/editar-cursos.component';
import { CursosEmpleadosComponent } from './empleados/cursos-empleados/cursos-empleados.component';
import { CursosEmpleadoresComponent } from './empleadores/cursos-empleadores/cursos-empleadores.component';
import { HojavidaProfesionalComponent } from './profesionales/hojavida-profesional/hojavida-profesional.component';
import { PostulacionesOfertasComponent } from './empleadores/postulaciones-ofertas/postulaciones-ofertas.component';
import { OfertasPOstuladasComponent } from './empleados/ofertas-postuladas/ofertas-postuladas.component';
import { OfertaCompletaComponent } from './empleados/oferta-completa/oferta-completa.component';
import { PostulantesContactadosComponent } from './empleadores/postulantes-contactados/postulantes-contactados.component';
import { TeContactaronComponent } from './empleados/te-contactaron/te-contactaron.component';
import { VerhojavidaProfesionalComponent } from './profesionales/verhojavida-profesional/verhojavida-profesional.component';
import { EditarhojavidaProfesionalComponent } from './profesionales/editarhojavida-profesional/editarhojavida-profesional.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OfertasPremiumComponent } from './empleados/ofertas-premium/ofertas-premium.component';
import { PerfilesPremiumComponent } from './empleadores/perfiles-premium/perfiles-premium.component';
import { IdhojavidaPrevioComponent } from './empleados/idhojavida-previo/idhojavida-previo.component';
import { ToastrModule } from 'ngx-toastr';
import { CursosCompradosempleadoComponent } from './empleados/cursos-compradosempleado/cursos-compradosempleado.component';
import { CursosCompradosempleadorComponent } from './empleadores/cursos-compradosempleador/cursos-compradosempleador.component';
import { CursosCompradosComponent } from './administracion/cursos-comprados/cursos-comprados.component';
import { SuscripcionesEmpleadoresComponent } from './administracion/suscripciones-empleadores/suscripciones-empleadores.component';
import { SuscripcionesEmpleadosComponent } from './administracion/suscripciones-empleados/suscripciones-empleados.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { EditarOfertas2Component } from './empleadores/editar-ofertas2/editar-ofertas2.component';
import { CursosGeneralesComponent } from './capacitaciones/cursos-generales/cursos-generales.component';
import { CursosGeneralesCompradosComponent } from './capacitaciones/cursos-generales-comprados/cursos-generales-comprados.component';
import { PerfilRegistroEmpleadorComponent } from './empleadores/perfil-registro-empleador/perfil-registro-empleador.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { RegistroCompletoComponent } from './empleadores/registro-completo/registro-completo.component';


export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AdmininicioComponent,
    AccountSettingsComponent,
    PerfilComponent,
    VerOfertasComponent,
    EditarOfertasComponent,
    PlanesComponent,
    HojavidaFormularioComponent,
    EditarHojavidaComponent,
    VerHojavidaComponent,
    PlanEmpleadosComponent,
    AdministradorComponent,
    CrearCursosComponent,
    VerCursosComponent,
    PerfilesComponent,
    OfertasPublicadasComponent,
    PerfilesAdminComponent,
    OfertasAdminComponent,
    EditarCursosComponent,
    CursosEmpleadosComponent,
    CursosEmpleadoresComponent,
    HojavidaProfesionalComponent,
    PostulacionesOfertasComponent,
    OfertasPOstuladasComponent,
    OfertaCompletaComponent,
    PostulantesContactadosComponent,
    TeContactaronComponent,
    VerhojavidaProfesionalComponent,
    EditarhojavidaProfesionalComponent,
    OfertasPremiumComponent,
    PerfilesPremiumComponent,
    IdhojavidaPrevioComponent,
    CursosCompradosempleadoComponent,
    CursosCompradosempleadorComponent,
    CursosCompradosComponent,
    SuscripcionesEmpleadoresComponent,
    SuscripcionesEmpleadosComponent,
    EditarOfertas2Component,
    CursosGeneralesComponent,
    CursosGeneralesCompradosComponent,
    PerfilRegistroEmpleadorComponent,
    RegistroCompletoComponent
  ],

  exports: [

    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PlanesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SweetAlert2Module,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    NgxPaginationModule,
    NgxSlideModalModule,
    NgxSpinnerModule,
    NgxStarRatingModule,
    BarRatingModule,
    LottieModule.forRoot({ player: playerFactory }),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXx41aKyQCxdHC7ixwG0rfOvmMAcvYJZk',
      libraries: ['places']
    })
  ]
})



export class PagesModule { }
