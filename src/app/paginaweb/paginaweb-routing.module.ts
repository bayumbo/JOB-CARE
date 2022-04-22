import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

import { Home2Component } from './home2/home2.component';
import { NineraComponent } from './buscarEmpleo/ninera/ninera.component';
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
import { PerfilEmpleadosComponent } from './perfil-empleados/perfil-empleados.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroCapacitacionComponent } from './registro-capacitacion/registro-capacitacion.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home2', component: Home2Component},
  { path: 'ninera', component: NineraComponent},
  { path: 'nineraEmpleador', component: NineraEmpleadorComponent},
  { path: 'cuidadoAdulto', component: CuidadoAdultoComponent},
  { path: 'cuidadoAdultoEmpleador', component: CuidadoAdultoEmpleadorComponent},
  { path: 'domestico', component: DomesticoComponent},
  { path: 'domesticoEmpleador', component: DomesticoEmpleadorComponent},
  { path: 'mascota', component: MascotaComponent},
  { path: 'mascotaEmpleador', component: MascotaEmpleadorComponent},
  { path: 'capacidades', component: CapacidadesEspecialesComponent},
  { path: 'capacidadesEmpleador', component: CapacidadesEspecialesEmpleadorComponent},
  { path: 'tutorias', component: TutoriasComponent},
  { path: 'tutoriasEmpleador', component: TutoriasEmpleadorComponent},
  { path: 'trabajos', component: TrabajosComponent},
  { path: 'trabajosEmpleador', component: TrabajosEmpleadorComponent},
  { path: 'asistencia', component: AsistenciaComponent},
  { path: 'asistenciaEmpleador', component: AsistenciaEmpleadorComponent},
  { path: 'mensajeria', component: MensajeriaComponent},
  { path: 'mensajeriaEmpleador', component: MensajeriaEmpleadorComponent},
  { path: 'spa', component: SpaComponent},
  { path: 'spaEmpleador', component: SpaEmpleadorComponent},
  { path: 'profesional', component: ProfesionalComponent},
  { path: 'profesionalEmpleador', component: ProfesionalEmpleadorComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'ofertaEmpleo', component: OfertasEmpleoComponent},
  { path: 'perfilEmpleados', component: PerfilEmpleadosComponent},
  { path: 'contacto', component: ContactoComponent},

  { path: 'capacitarse', component: RegistroCapacitacionComponent},


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes)
  ],

  exports:[ RouterModule]
})
export class PaginawebRoutingModule { }
