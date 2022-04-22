import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';
//import { GeneralService } from 'src/app/services/general.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Notification } from 'src/app/models/notification';
import Swal from 'sweetalert2';
import { CalificacionService } from 'src/app/services/calificacion.service';
declare function customInitFunctions();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;

  //notificaciones empleador
  //Notificacion
  notifications = new Array<Notification>();
  newNotifications: number;
  public imgUrl = '';

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router,
    private _notificationService: CalificacionService,
  ) {

    customInitFunctions();
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    customInitFunctions();
    this.getNotifications();
    setTimeout(() => {
      this._usuarioService.logOut();
    }, 900000);
  }

  cerrarSesion() {
    this._usuarioService.logOut();
  }

  activar() {
    customInitFunctions();
  }

  actualizarRol(usuario: Usuario){
    Swal.fire({
      title: 'Esta seguro de cambiar a modo empleado?',
      text: "¡Debe iniciar sesión de nuevo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'Si, CAMBIAR'
    }).then((result) => {
      if (result.isConfirmed) {
      this.guardarUsuario(usuario)
        Swal.fire(
          'Oferta de empleo !',
          'ha sido eliminada.',
          'success'
        )
      }
    })


  }

  role = 'EMPLEADO_ROLE';

  guardarUsuario(usuario: Usuario) {
    this.usuario.role = this.role;
    this._usuarioService.actualizarUsuario(usuario).subscribe();

    this.router.navigate(['/login']);
  }


  actualizarRol1(usuario: Usuario){
    Swal.fire({
      title: 'Esta seguro de cambiar a modo empleador?',
      text: "¡Debe iniciar sesión de nuevo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'Si, CAMBIAR'
    }).then((result) => {
      if (result.isConfirmed) {
      this.guardarUsuario1(usuario)
        Swal.fire(
          'Oferta de empleo !',
          'ha sido eliminada.',
          'success'
        )
      }
    })


  }

  role1 = 'EMPLEADOR_ROLE';
  guardarUsuario1(usuario: Usuario) {
    this.usuario.role = this.role1;
    this._usuarioService.actualizarUsuario(usuario).subscribe();

    this.router.navigate(['/login']);
  }

  //Notificaciones empleadores
  getNotifications() {
    this.newNotifications = 0;
    this._notificationService
      .get(`calificacion?user_id=${this.usuario._id}`)
      .subscribe(
        (res) => {
          this.notifications = res['data'];
          this.notifications.forEach((element) => {
            if (!element.view) {
              this.newNotifications += 1;
            }
          });
        },
        (err) => {
          console.error(err);
        }
      );
  }

  /* Notification */
  viewNotification(notification: Notification) {
    localStorage.setItem('idNotification', notification._id);
    if (notification.view) {
      this.routerNavigate(notification);
    } else {
      notification.view = true;
      this._notificationService
        .updateOpcion(notification, `calificacion`)
        .subscribe(
          (res) => {
            this.routerNavigate(notification);

          },
          (err) => {
            console.error(err);
          }
        );


    }
  }

  routerNavigate(notification: Notification){
    if (notification.receiver.role == 'EMPLEADO_ROLE') {
      this.router
        .navigateByUrl(`/`, {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate([`dashboard/teContactaron`]);
        } );
    } else if (notification.receiver.role == 'EMPLEADOR_ROLE') {
      this.router
        .navigateByUrl(`/`, {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate([`dashboard/postulacionOfertas`]);



        } );
    }
  }

  eliminar(notification: Notification){
    this._notificationService.deleteOpcion(`calificacion/${notification._id}`)
    .subscribe( res => {
       console.log(res, 'se elimino')
    }, err => {
      console.error(err);
    } )
  }
}
