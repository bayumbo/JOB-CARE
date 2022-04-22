import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService
  ) { }
  canActivate(){

    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }


    if ( this._usuarioService.usuario.role === 'EMPLEADOR_ROLE') {
      return true;
    }
    if ( this._usuarioService.usuario.role === 'EMPLEADO_ROLE') {
      return true;
    }
    if ( this._usuarioService.usuario.role === 'CAPACITATE_ROLE') {
      return true;
    }
    else {
      console.log( 'Bloqueado por el  GUARD');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Su usuario esta Inactivo',

      });
      this._usuarioService.logOut();
      return false;
    };


  }

}

