import { HojavidaService } from './services/hojavida.service';

import { CategoriasService } from './services/categorias.service';
import { OfertaService } from 'src/app/services/oferta.service';
import { SidebarService } from './services/sidebar.service';
import { PagesModule } from './pages/pages.module';
import { PaginawebModule } from './paginaweb/paginaweb.module';
import { AuthModule } from './auth/auth.module';



//modulos

import { AppRoutingModule } from './app-routing.module';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { UsuarioService } from './services/usuario.service';
import { PipesModule } from './pipes/pipes.module';
import { SubirArchivoService } from './services/subir-archivo.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSlideModalModule } from 'ngx-slide-modal';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { BarRatingModule } from 'ngx-bar-rating';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
],

  imports: [
    PaginawebModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    PipesModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxSlideModalModule,
    NgxStarRatingModule,
    BarRatingModule,
    TooltipModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [
    UsuarioService,
    SidebarService,
    SubirArchivoService,
    OfertaService,
    CategoriasService,
    HojavidaService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
