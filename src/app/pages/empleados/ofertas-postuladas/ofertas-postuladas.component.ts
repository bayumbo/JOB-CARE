import { PostulacionService } from './../../../services/postulacion.service';
import { Postulacion } from 'src/app/models/postulacion';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Calificacion } from 'src/app/models/calficacion.model';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-ofertas-postuladas',
  templateUrl: './ofertas-postuladas.component.html',
  styleUrls: ['./ofertas-postuladas.component.css'],
})
export class OfertasPOstuladasComponent implements OnInit {
  formularios: Postulacion[];
  totalRegistros: number = 1;
  hojaModelo = new Postulacion();
  notifications = new Array<Calificacion>();
  usuario: Usuario;
  newNotifications: number;
  public notificacion = new EventEmitter<any>();
  constructor(
    private listainforme: PostulacionService,
    private location: Location,
    private _notificationService: CalificacionService,
    public _usuarioServices: UsuarioService,
  ) {
    this.notificacion.subscribe((resp) => this.getPostulantes());

    this.usuario = this._usuarioServices.usuario;
  }

  ngOnInit() {
   // this.getFormulariosOfertas();
  // this.getNotificationsCalificacion();

 this.getPostulantes()
  }

/*   getFormulariosOfertas() {
    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.listainforme.getPostulacion(usuario._id).subscribe(
      (result) => {
        this.formularios = result;

        console.log(this.formularios, 'historial de mis postulaciones');
      },
      (error) => {
        console.log(error, 'Error');
        //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');
      }
    );
  } */

  eliminar(id) {
    Swal.fire({
      title: 'Esta seguro de eliminar su postulación?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'Si, ELIMINAR',
    }).then((result) => {
      if (result.isConfirmed) {
       // this.delete(id);
       this.eliminar1(id);
        Swal.fire('Su postulación !', 'ha sido eliminada.', 'success');
      }
    });
  }
/*
  delete(_id): void {
    //   this.submitted = true;
    this.listainforme.deletePOstulacion(_id).subscribe((result) => {
      console.log(result);
      this.notificacion.emit(result);
    });
    // this.goBack();
  } */

  goBack(): void {
    this.location.back();
  }
  getPostulantes(){
    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this._notificationService.getPostulacion(usuario._id).subscribe(
      result => {
        this.notifications =  result;
       console.log(this.notifications,'contactados')


  })
  }
  eliminar1(notification: Calificacion){
    this._notificationService.deleteOpcion(`calificacion/${notification._id}`)
    .subscribe( res => {

      this.notificacion.emit( res);
       console.log(res, 'se elimino')
    }, err => {
      console.error(err);
    } )
  }
}
