import { CalificacionService } from './../../../services/calificacion.service';
import { ContactoPostulanteService } from './../../../services/contacto-postulante.service';

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { HojavidaService } from 'src/app/services/hojavida.service';
import { Hojavida } from 'src/app/models/hojavida';
import Swal from 'sweetalert2';
import { Contacto } from 'src/app/models/contactoPOstulante';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Notification } from 'src/app/models/notification';
import { GeneralService } from 'src/app/services/general.service';
import { FormBuilder } from '@angular/forms';
import { Calificacion } from 'src/app/models/calficacion.model';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  usuario: Usuario;
  notification = new  Calificacion();

  notifications = new Array<Calificacion>();
  postulacionModelo = new Contacto();
  cargando = false;
  formularios: Hojavida[];
  ofertaModelo= new Hojavida();
  totalRegistros: number = 1;
  rate = 5;
  newNotifications: number;

  public registerForm = this.fb.group({

    rating:[],
  })

  constructor(
    private listainforme :HojavidaService,
    private _contacto: ContactoPostulanteService,
    public _usuarioServices: UsuarioService,
    private _notificationService: CalificacionService,


    private fb: FormBuilder,
    ) {

    this.usuario = this._usuarioServices.usuario;

  }



  ngOnInit(): void {

    this.getFormulariosOfertas();
    this.getNotificationsCalificacion();
  }




  getFormulariosOfertas() {

    this.listainforme.getOpciones().subscribe(
      result => {
        this.formularios =  result ;
         console.log(this.formularios)




     });
    }



    postulando = "POSTULADO"
    postular(id,nombre, apellido,descripcion,cedula,ciudad,direccion,categoria, email, telefo,pdf,usuario) {
      console.log('estoy postulando')
      // Realizar el posteo
      this.postulacionModelo.telefonoPostulante = telefo
      this.postulacionModelo.emailPostulante = email
      this.postulacionModelo.nombrePostulante = nombre
      this.postulacionModelo.apellidoPostulante= apellido
      this.postulacionModelo.cedulaPostulante = cedula
      this.postulacionModelo.direccionPostulante = descripcion
     this.postulacionModelo.direccionPostulante = direccion
     this.postulacionModelo.categoriaPostulante = categoria
     this.postulacionModelo.ciudadPostulante = ciudad
     this.postulacionModelo.urlPdf = pdf


    this.postulacionModelo.telefonoPostulante = telefo
    this.postulacionModelo.emailEmpleador= this.usuario.email;

    this.postulacionModelo.nombre = this.usuario.usuario
    this.postulacionModelo.telefono = this.usuario.telefono
    //  this.postulacionModelo.postulacion = id;
      this.postulacionModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;

         this._contacto.addContacto(this.postulacionModelo).subscribe(
        resp => {
             console.log(resp,'Postulación Exitosa')
        //  Swal.fire("Postulación EXITOSA", "", "success")
        //  console.log(resp);

        this.notification.title = this.usuario.email;
        this.notification.detalle = 'Solicitud de empleador le gusta tu hoja de vida';
        this.notification.uri = id;
        this.notification.receiver=usuario;
        this.notification.trasmitter = JSON.parse(localStorage.getItem('usuario')) as Usuario;;
        this.notification.view = false;

        this._notificationService
          .create(this.notification, `notification`)
          .subscribe(
            (res) => {
              Swal.fire(
                'Postulación Exitosa',
                '',
                'success'
              );
            },
            (err) => {
              console.error(err);
            }
          );

        }, (err) => {

         Swal.fire(this.postulacionModelo.usuario.email, err.error.msg, 'error');

        })

    }


    ActulizarEstado(id,nombre, apellido,descripcion,cedula,ciudad,direccion,categoria, email, telefo,pdf,usuario) {

      this.ofertaModelo._id = id;
    //  this.ofertaModelo.descripcion = this.ID
      this.ofertaModelo.user = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.addOpcion2(this.ofertaModelo).subscribe(
          resp => {

          Swal.fire("Perfil Notificado", "", "success")
       //   console.log(resp);

        }, (err) => {

          Swal.fire(this.ofertaModelo.usuario.email, err.error.msg, 'error');

        })

     this.postular(id,nombre, apellido,descripcion,cedula,ciudad,direccion,categoria, email, telefo,pdf,usuario)
    }

   actualizarRating(formularios: Hojavida){

   // this.ofertaModelo.rating = this.registerForm.value.rating
    this.listainforme.updateOpcion(formularios).subscribe(
      resp => {

      Swal.fire("Perfil Calificado", "", "success")
    console.log(resp);

    }, (err) => {

      Swal.fire(this.ofertaModelo.usuario.email, err.error.msg, 'error');

    })
   }

 buscarHoja( termino: string ) {

  if ( termino.length <= 0 ) {
    this.getFormulariosOfertas()
    return;
  }

  this.cargando = true;

  this.listainforme.buscarHojavida( termino )
          .subscribe( (hojavida: Hojavida[]) => {

            this.formularios = hojavida

            console.log(this.formularios,'oe')
            this.cargando = false;
          });

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

calificando(id, user, email){

  this.notification.title = this.usuario.email;
  this.notification.detalle = "Empleador solicitando"
  this.notification.uri = id;
  this.notification.receiverHoja = id;
  this.notification.receiver= user;
  this.notification.trasmitter = JSON.parse(localStorage.getItem('usuario')) as Usuario;
  this.notification.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
  this.notification.view = false;


  this.notification.emailHoja =  email;
  this.notification.telefonoEmpleador = this.usuario.telefono;
  this._notificationService
    .create(this.notification, `calificacion`)
    .subscribe(
      (res) => {

        Swal.fire(
          'Perfíl contactado Exitosamente',
          '',
          'success'
        );
      },
      (err) => {
        console.error(err);
        Swal.fire("Ya seleccionaste este perfíl",  "anteriormente", 'error');
      }
    );
}

}
