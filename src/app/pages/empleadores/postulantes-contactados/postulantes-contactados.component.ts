import { Component, EventEmitter, OnInit } from '@angular/core';
import { Calificacion } from 'src/app/models/calficacion.model';
import { Contacto } from 'src/app/models/contactoPOstulante';
import { Usuario } from 'src/app/models/usuario.model';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { ContactoPostulanteService } from 'src/app/services/contacto-postulante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulantes-contactados',
  templateUrl: './postulantes-contactados.component.html',
  styleUrls: ['./postulantes-contactados.component.css']
})
export class PostulantesContactadosComponent implements OnInit {

 // formularios: Contacto[];
  totalRegistros: number = 1;


  notifications = new Array<Calificacion>();
  newNotifications: number;

  public notificacion = new EventEmitter<any>();
  constructor(
    private listainforme:  ContactoPostulanteService,
    private _notificationService: CalificacionService,

    ) {

    this.notificacion.subscribe(
      resp =>
     // this.getFormulariosOfertas();
     this.getPostulantes()
    )
   }


  ngOnInit() {

  // this.getFormulariosOfertas();
  this.getPostulantes()
   }

/*        getFormulariosOfertas() {

       const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
       this.listainforme.getContacto(usuario._id).subscribe(
         result => {
            this.formularios =  result;
           console.log(this.formularios,'contactados')

            },error =>{
        console.log(error,'Error')
       //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');
       });
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
      this.eliminar1(id);
      Swal.fire('Su postulación !', 'ha sido eliminada.', 'success');
    }
  });
}

/* delete(_id): void {
  //   this.submitted = true;
  this.listainforme.deleteContacto(_id).subscribe((result) => {
    console.log(result);
    this.notificacion.emit( result);
  });
 // this.goBack();
} */

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

