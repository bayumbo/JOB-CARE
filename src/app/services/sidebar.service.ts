import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable()
export class SidebarService {
   menu: any[] = [];


 /*  menu: any = [
     {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
         { titulo: 'Panel Principal', url: '/Inicio' },
         { titulo : 'Crear usuarios', url: '/Registrar' },
         { titulo: 'Lista Proveedores', url: '/idProveedores' },
         { titulo: 'Informes Comerciales', url: '/adminInforme' },
         { titulo: 'Proceso Proveedor', url: '/requisitoadmin' },
         { titulo: 'Solicitud', url: '/AdminProv' },

         { titulo: 'Usuarios', url: '/usuarios' }
      ]
     },
  
  ];
   */
constructor(
    public _usuarioService: UsuarioService
  ) { }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
   // window.location.reload();
  }

}
