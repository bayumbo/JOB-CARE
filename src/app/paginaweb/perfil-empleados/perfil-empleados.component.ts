import { HojavidaService } from './../../services/hojavida.service';
import { Hojavida } from './../../models/hojavida';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { JoyrideService } from 'ngx-joyride';
@Component({
  selector: 'app-perfil-empleados',
  templateUrl: './perfil-empleados.component.html',
  styleUrls: ['./perfil-empleados.component.css']
})
export class PerfilEmpleadosComponent implements OnInit {

  usuario: Usuario;

  cargando: boolean = true;

  formularios: Hojavida[]=[];

  totalRegistros: number = 0;
  constructor(private listainforme :HojavidaService, private joyride: JoyrideService,) {



  }



  ngOnInit() {

    this.getFormulariosOfertas()
  }



  getFormulariosOfertas() {


    this.listainforme.getOpciones().subscribe(
      result => {

         this.formularios =  result;

         this.cargando = false;
     });



}


postular(){
  console.log('estoy postulando')
  /* Swal.fire({
     title: '<strong>Regístrate </strong>',
     text: 'Regístrate en una de nuestras categorias para contratar o publicar tu oferta',
     icon: 'success',

     showCloseButton: true,
     showCancelButton: true,
     focusConfirm: false,
     confirmButtonText:
       '<i class="fa fa-thumbs-up"></i> <a href="#/home2"><b style="color:#FBFBFB";> PUBLICAR EMPLEO</b></a>',
     confirmButtonAriaLabel: 'Thumbs up, great!',
     cancelButtonText:
       '<i class="fa fa-thumbs-down"></i>',
     cancelButtonAriaLabel: 'Thumbs down'
   })  */


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


  //mensaje guia ================================//
  asistencia(){
    this.joyride.startTour(
      { steps: ['perfil'],
      customTexts: {
        next: 'SIGUIENTE',
        prev: 'ANTERIOR',
        done: 'CERRAR'
      }, themeColor: '#56c2c6',
      stepDefaultPosition: 'center',
    }
    )
  }

}



