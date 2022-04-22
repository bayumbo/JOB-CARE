import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerOfertasComponent } from './empleadores/ver-ofertas/ver-ofertas.component';
import { EditarOfertasComponent } from './empleadores/editar-ofertas/editar-ofertas.component';

import { HojavidaFormularioComponent } from './empleados/hojavida-formulario/hojavida-formulario.component';
import { EditarHojavidaComponent } from './empleados/editar-hojavida/editar-hojavida.component';
import { VerHojavidaComponent } from './empleados/ver-hojavida/ver-hojavida.component';
import { PlanEmpleadosComponent } from './empleados/plan-empleados/plan-empleados.component';
import { AdministradorComponent } from './administracion/administrador/administrador.component';
import { CrearCursosComponent } from './administracion/crear-cursos/crear-cursos.component';
import { VerCursosComponent } from './administracion/ver-cursos/ver-cursos.component';

import { AdmininicioComponent } from './empleadores/admininicio/admininicio.component';
import { PlanesComponent } from './empleadores/planes/planes.component';
import { PerfilesComponent } from './empleadores/perfiles/perfiles.component';
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
import { TeContactaronComponent } from './empleados/te-contactaron/te-contactaron.component';
import { PostulantesContactadosComponent } from './empleadores/postulantes-contactados/postulantes-contactados.component';
import { AdminGuard } from '../guards/admin.guard';
import { EditarhojavidaProfesionalComponent } from './profesionales/editarhojavida-profesional/editarhojavida-profesional.component';
import { VerhojavidaProfesionalComponent } from './profesionales/verhojavida-profesional/verhojavida-profesional.component';
import { IdhojavidaPrevioComponent } from './empleados/idhojavida-previo/idhojavida-previo.component';
import { CursosCompradosempleadoComponent } from './empleados/cursos-compradosempleado/cursos-compradosempleado.component';
import { CursosCompradosempleadorComponent } from './empleadores/cursos-compradosempleador/cursos-compradosempleador.component';
import { CursosCompradosComponent } from './administracion/cursos-comprados/cursos-comprados.component';
import { SuscripcionesEmpleadoresComponent } from './administracion/suscripciones-empleadores/suscripciones-empleadores.component';
import { SuscripcionesEmpleadosComponent } from './administracion/suscripciones-empleados/suscripciones-empleados.component';
import { EditarOfertas2Component } from './empleadores/editar-ofertas2/editar-ofertas2.component';
import { CursosGeneralesComponent } from './capacitaciones/cursos-generales/cursos-generales.component';
import { CursosGeneralesCompradosComponent } from './capacitaciones/cursos-generales-comprados/cursos-generales-comprados.component';
import { PerfilRegistroEmpleadorComponent } from './empleadores/perfil-registro-empleador/perfil-registro-empleador.component';
import { RegistroCompletoComponent } from './empleadores/registro-completo/registro-completo.component';




const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,canActivate:[AdminGuard],
    children: [
        { path: '', component: DashboardComponent, data:{ titulo: 'Dashboard'}},
        { path: 'admininico', component: AdmininicioComponent  },
        { path: 'admininico/:id', component: AdmininicioComponent },
        { path: 'account-settings', component: AccountSettingsComponent,  data:{ titulo: 'Temas'},canActivate:[AdminGuard] },
        { path: 'perfil', component: PerfilComponent,  data:{ titulo: 'Perfil'} },
        { path: 'verofertas', component: VerOfertasComponent,  data:{ titulo: 'Ver Ofertas'},canActivate:[AdminGuard] },
        { path: 'editaroferta', component: EditarOfertasComponent,  data:{ titulo: 'Editar Ofertas'},canActivate:[AdminGuard] },
        { path: 'editaroferta/:id', component: EditarOfertasComponent,  data:{ titulo: 'Editar Ofertas'},canActivate:[AdminGuard] },
        { path: 'editaroferta2', component: EditarOfertas2Component,  data:{ titulo: 'Editar Ofertas'},canActivate:[AdminGuard] },
        { path: 'editaroferta2/:id', component: EditarOfertas2Component,  data:{ titulo: 'Editar Ofertas'},canActivate:[AdminGuard] },
        { path: 'planes', component: PlanesComponent,  data:{ titulo: 'Planes'} },
        { path: 'planes/empleados', component: PlanEmpleadosComponent,  data:{ titulo: 'Planes'},canActivate:[AdminGuard] },
        { path: 'hojavida', component: HojavidaFormularioComponent ,canActivate:[AdminGuard] },
        { path: 'editarhojavida', component: EditarHojavidaComponent,canActivate:[AdminGuard] },
        { path: 'editarhojavida/:id', component: EditarHojavidaComponent,canActivate:[AdminGuard] },
        { path: 'verhoja', component: VerHojavidaComponent,canActivate:[AdminGuard] },
        { path: 'administrador', component: AdministradorComponent,canActivate:[AdminGuard] },
        { path: 'crearCurso', component: CrearCursosComponent,canActivate:[AdminGuard] },
        { path: 'verCurso', component: VerCursosComponent,canActivate:[AdminGuard] },
        { path: 'perfiles', component: PerfilesComponent,canActivate:[AdminGuard]},
        { path: 'ofertasPublicadas', component: OfertasPublicadasComponent,canActivate:[AdminGuard] },
        { path: 'perfilesAdmin', component: PerfilesAdminComponent,canActivate:[AdminGuard]},
        { path: 'ofertasAdmin', component: OfertasAdminComponent,canActivate:[AdminGuard]},
        { path: 'editarCursos', component: EditarCursosComponent,canActivate:[AdminGuard]},
        { path: 'editarCursos/:id', component: EditarCursosComponent,canActivate:[AdminGuard]},
        { path: 'cursosEmpleados', component: CursosEmpleadosComponent,canActivate:[AdminGuard]},
        { path: 'cursosEmpleadores', component: CursosEmpleadoresComponent,canActivate:[AdminGuard]},
        { path: 'hojavidaprofesional', component: HojavidaProfesionalComponent,canActivate:[AdminGuard] },

        { path: 'postulacionOfertas', component: PostulacionesOfertasComponent,canActivate:[AdminGuard] },
        { path: 'ofertasPostuladas', component: OfertasPOstuladasComponent,canActivate:[AdminGuard] },
        { path: 'ofertaCompleta', component: OfertaCompletaComponent,canActivate:[AdminGuard] },
        { path: 'ofertaCompleta/:id', component: OfertaCompletaComponent,canActivate:[AdminGuard] },
        { path: 'teContactaron', component: TeContactaronComponent,canActivate:[AdminGuard] },
        { path: 'postulantesContactados', component: PostulantesContactadosComponent,canActivate:[AdminGuard] },
        { path: 'editarhojavidaprofesional', component:EditarhojavidaProfesionalComponent,canActivate:[AdminGuard] },
        { path: 'editarhojavidaprofesional/:id', component:EditarhojavidaProfesionalComponent,canActivate:[AdminGuard] },
        { path: 'verhojaProfesional', component: VerhojavidaProfesionalComponent,canActivate:[AdminGuard] },
        { path: 'hoja', component: IdhojavidaPrevioComponent,canActivate:[AdminGuard] },
        { path: 'hoja/:id', component: IdhojavidaPrevioComponent,canActivate:[AdminGuard] },
        { path: 'cursosComprados', component: CursosCompradosempleadoComponent,canActivate:[AdminGuard] },
        { path: 'cursosCompradosEmpleador', component: CursosCompradosempleadorComponent,canActivate:[AdminGuard] },


        { path: 'suscripcionesEmpleadores', component: SuscripcionesEmpleadoresComponent,canActivate:[AdminGuard] },
        { path: 'suscripcionesEmpleados', component: SuscripcionesEmpleadosComponent,canActivate:[AdminGuard] },
        { path: 'cursosCompradosT', component: CursosCompradosComponent,canActivate:[AdminGuard] },
        { path: 'cursosCompra', component: CursosGeneralesComponent,canActivate:[AdminGuard] },
        { path: 'cursosComprad', component: CursosGeneralesCompradosComponent,canActivate:[AdminGuard] },
        { path: 'registro', component: PerfilRegistroEmpleadorComponent,canActivate:[AdminGuard] },

        { path: 'registroCompleto', component: RegistroCompletoComponent,canActivate:[AdminGuard] },
        { path: 'registroCompleto/:id', component: RegistroCompletoComponent,canActivate:[AdminGuard] },
      ]
},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes)
  ],

  exports:[ RouterModule]
})
export class PagesRoutingModule { }
