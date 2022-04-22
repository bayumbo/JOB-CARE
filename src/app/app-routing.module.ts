import { AuthRoutingModule } from './auth/auth-routing.module';

// Rutas hijas
import { PagesRoutingModule } from './pages/pages-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PaginawebRoutingModule } from './paginaweb/paginaweb-routing.module';






const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

  { path: '**', component: NopagefoundComponent}



];

@NgModule({
  declarations: [],
  imports: [
 RouterModule.forRoot( routes, { useHash: true, relativeLinkResolution: 'legacy' }),
 PagesRoutingModule,
 AuthRoutingModule,
 PaginawebRoutingModule
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
