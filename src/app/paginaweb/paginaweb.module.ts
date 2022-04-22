import { HeaderPaginaComponent } from './header-pagina/header-pagina.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';

import { FooterComponent } from './footer/footer.component';
import { Home2Component } from './home2/home2.component';
import { NineraComponent } from './buscarEmpleo/ninera/ninera.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
import { CursosComponent } from './cursos/cursos.component';
import { NineraEmpleadorComponent } from './publicarEmpleo/ninera-empleador/ninera-empleador.component';
import { CuidadoAdultoComponent } from './buscarEmpleo/cuidado-adulto/cuidado-adulto.component';
import { CuidadoAdultoEmpleadorComponent } from './publicarEmpleo/cuidado-adulto-empleador/cuidado-adulto-empleador.component';
import { DomesticoComponent } from './buscarEmpleo/domestico/domestico.component';
import { DomesticoEmpleadorComponent } from './publicarEmpleo/domestico-empleador/domestico-empleador.component';
import { MascotaComponent } from './buscarEmpleo/mascota/mascota.component';
import { MascotaEmpleadorComponent } from './publicarEmpleo/mascota-empleador/mascota-empleador.component';
import { CapacidadesEspecialesComponent } from './buscarEmpleo/capacidades-especiales/capacidades-especiales.component';
import { CapacidadesEspecialesEmpleadorComponent } from './publicarEmpleo/capacidades-especiales-empleador/capacidades-especiales-empleador.component';
import { TutoriasComponent } from './buscarEmpleo/tutorias/tutorias.component';
import { TutoriasEmpleadorComponent } from './publicarEmpleo/tutorias-empleador/tutorias-empleador.component';
import { TrabajosComponent } from './buscarEmpleo/trabajos/trabajos.component';
import { TrabajosEmpleadorComponent } from './publicarEmpleo/trabajos-empleador/trabajos-empleador.component';
import { AsistenciaComponent } from './buscarEmpleo/asistencia/asistencia.component';
import { AsistenciaEmpleadorComponent } from './publicarEmpleo/asistencia-empleador/asistencia-empleador.component';
import { MensajeriaComponent } from './buscarEmpleo/mensajeria/mensajeria.component';
import { MensajeriaEmpleadorComponent } from './publicarEmpleo/mensajeria-empleador/mensajeria-empleador.component';
import { SpaComponent } from './buscarEmpleo/spa/spa.component';
import { SpaEmpleadorComponent } from './publicarEmpleo/spa-empleador/spa-empleador.component';
import { ProfesionalComponent } from './buscarEmpleo/profesional/profesional.component';
import { ProfesionalEmpleadorComponent } from './publicarEmpleo/profesional-empleador/profesional-empleador.component';
import { OfertasEmpleoComponent } from './ofertas-empleo/ofertas-empleo.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PerfilEmpleadosComponent } from './perfil-empleados/perfil-empleados.component';
import { PipesModule } from '../pipes/pipes.module';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { BarRatingModule } from 'ngx-bar-rating';
import { RatingModule } from 'ng-starrating';
import { TooltipModule } from 'ng2-tooltip-directive';
import { PaginawebComponent } from './paginaweb.component';
import { JoyrideModule } from 'ngx-joyride';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroCapacitacionComponent } from './registro-capacitacion/registro-capacitacion.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';


export function playerFactory() {
  return player;
}




@NgModule({
  declarations: [
    HeaderPaginaComponent,

    InicioComponent,
    HomeComponent,

    FooterComponent,
    Home2Component,
    NineraComponent,
    CursosComponent,
    NineraEmpleadorComponent,
    CuidadoAdultoComponent,
    CuidadoAdultoEmpleadorComponent,
    DomesticoComponent,
    DomesticoEmpleadorComponent,
    MascotaComponent,
    MascotaEmpleadorComponent,
    CapacidadesEspecialesComponent,
    CapacidadesEspecialesEmpleadorComponent,
    TutoriasComponent,
    TutoriasEmpleadorComponent,
    TrabajosComponent,
    TrabajosEmpleadorComponent,
    AsistenciaComponent,
    AsistenciaEmpleadorComponent,
    MensajeriaComponent,
    MensajeriaEmpleadorComponent,
    SpaComponent,
    SpaEmpleadorComponent,
    ProfesionalComponent,
    ProfesionalEmpleadorComponent,
    OfertasEmpleoComponent,
    PerfilEmpleadosComponent,
    PaginawebComponent,
    ContactoComponent,
    RegistroCapacitacionComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxSpinnerModule,
    NgxStarRatingModule,
    PipesModule,
    BarRatingModule,
    RatingModule,
    LottieModule.forRoot({ player: playerFactory }),
    JoyrideModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXx41aKyQCxdHC7ixwG0rfOvmMAcvYJZk',
      libraries: ['places']
    }),
    TooltipModule,
  

  ],
  exports:[
    HeaderPaginaComponent,
    NineraComponent,
    HeaderPaginaComponent,

  ]
})
export class PaginawebModule { }
