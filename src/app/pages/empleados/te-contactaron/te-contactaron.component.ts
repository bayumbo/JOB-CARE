import { HojavidaService } from 'src/app/services/hojavida.service';
import { Hojavida } from 'src/app/models/hojavida';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Calificacion } from 'src/app/models/calficacion.model';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-te-contactaron',
  templateUrl: './te-contactaron.component.html',
  styleUrls: ['./te-contactaron.component.css']
})
export class TeContactaronComponent implements OnInit {

  usuario: Usuario;


  notifications = new Array<Calificacion>();
  newNotifications: number;

 // formularios: Hojavida[];
//  ofertaModelo= new Hojavida();
  totalRegistros: number = 1;



  constructor(
   // private listainforme: HojavidaService,
    private _notificationService: CalificacionService,
    public _usuarioServices: UsuarioService,
    ) {
      this.usuario = this._usuarioServices.usuario;

     }
  ngOnInit() {



 //   this.getFormulariosOfertas();
    this.getNotificationsCalificacion();
  }






/*   getFormulariosOfertas() {

      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.getHojavida(usuario._id).subscribe(
        result => {
           this.formularios =  result
           console.log(this.formularios,'TODO contacto')

       },error =>{
       console.log(error,'Error')
      //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');


       });



  }
 */

getNotificationsCalificacion() {



  this.newNotifications = 0;
  this._notificationService
    .get(`calificacion?user_id=${this.usuario._id}`)
    .subscribe(
      (res) => {
        this.notifications = res['data'];
        console.log(res, 'mis calificaciones')
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
}
