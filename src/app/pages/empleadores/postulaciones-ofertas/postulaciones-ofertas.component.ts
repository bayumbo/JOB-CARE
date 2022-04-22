import { Calificacion } from './../../../models/calficacion.model';

import { OfertaService } from '../../../services/oferta.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HojavidaService } from 'src/app/services/hojavida.service';
import { Hojavida } from 'src/app/models/hojavida';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';



declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-postulaciones-ofertas',
  templateUrl: './postulaciones-ofertas.component.html',
  styleUrls: ['./postulaciones-ofertas.component.css']
})
export class PostulacionesOfertasComponent implements OnInit {

  usuario: Usuario;
  notification = new Calificacion();

  formularios1: Hojavida[];
  notifications = new Array<Calificacion>();
  newNotifications: number;
  ofertaModel1= new Hojavida();

  formularios: Ofertas[];
  ofertaModelo= new Ofertas();
  totalRegistros: number = 1;

  public registerForm = this.fb.group({
   contratado:['']
  })

  constructor(

    //private listainforme: OfertaService,
    private _notificationService: CalificacionService,
    public _usuarioServices: UsuarioService,
    private listainforme :HojavidaService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
    ) {

      this.usuario = this._usuarioServices.usuario;

     }
  ngOnInit() {



   // this.getFormulariosOfertas();
    this.getNotificationsCalificacion();
  }

rating
rating2
idh
calificar(id){
  id  = localStorage.setItem('idHoja',id)
  jQuery(document).ready(function($){
   let i
   let ix
    $(".btnrating").on('click',(function(e) {

    var previous_value = $("#selected_rating").val();

    var selected_value = $(this).attr("data-attr");
    $("#selected_rating").val(selected_value);

    $(".selected-rating").empty();
    $(".selected-rating").html(selected_value);

    for (i = 1; i <= selected_value; ++i) {
    $("#rating-star-"+i).toggleClass('btn-warning');
    $("#rating-star-"+i).toggleClass('btn-default');
    }

    for (ix = 1; ix <= previous_value; ++ix) {
    $("#rating-star-"+ix).toggleClass('btn-warning');
    $("#rating-star-"+ix).toggleClass('btn-default');
    }
    this.rating = $(this).attr("data-attr");
    localStorage.setItem('rating', this.rating)


    this.idh = localStorage.getItem('idHoja');

    }));


  });

}



/*   getFormulariosOfertas() {

      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.getOfertas(usuario._id).subscribe(
        result => {
           this.formularios =  result
           console.log(this.formularios,'TODO')

       },error =>{
       console.log(error,'Error')
      //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');


       });



  } */

  nohay(){
    Swal.fire(

      'NO HAY',
      'ADJUNTOS EN ESTA HOJA DE VIDA',
      'warning'
    );

  }


calificando(id, user){

  this.notification.title = this.usuario.email;
  this.notification.detalle = this.rating2;
  this.notification.uri = id;
  this.notification.receiverOferta = id;
  this.notification.receiver= user;
  this.notification.trasmitter = JSON.parse(localStorage.getItem('usuario')) as Usuario;;
  this.notification.view = false;
  localStorage.removeItem('rating');
  this._notificationService
    .create(this.notification, `calificacion`)
    .subscribe(
      (res) => {
        console.log (res,'cali')
        Swal.fire(
          'Calificación Exitosa',
          '',
          'success'
        );
      },
      (err) => {
        console.error(err);
      }
    );
}


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

presionar(n){
console.log(n)
  this.actualizarRating(n)
}

actualizarRating(n): void{

  this.ofertaModel1._id = localStorage.getItem('idHoja')
 // this.ofertaModel1._id = JSON.parse(localStorage.getItem('idHoja')) as Hojavida;
   this.ofertaModel1.rating = n;

   this.spinner.show();
   setTimeout(() => {


   this.listainforme.updateOpcion(this.ofertaModel1).subscribe(
     resp => {

     Swal.fire("Perfil Calificado", "", "success")
     this.registerForm.reset()
   console.log(resp);
   localStorage.removeItem('idHoja');

   }, (err) => {

     Swal.fire('Cerrar y presionar nuevamente calificar', err.error.msg, 'error');

   })


   this.spinner.hide();
  }, 5000);
  localStorage.removeItem('rating');
  }
dato: any
cal(){
   this.dato= this.registerForm.value.contratado
   if(this.dato =='SI'){
    Swal.fire("Confirmación de perfil contratado", "por favor califique recuerde que si no contrato su cuenta puede ser borrada", "success")
   }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Solo calificas si contrataste!',

    })
   }

}


}
