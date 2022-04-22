
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router,} from '@angular/router';
import { Hojavida } from 'src/app/models/hojavida';
import { Usuario } from 'src/app/models/usuario.model';
import { HojavidaService } from 'src/app/services/hojavida.service';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';
declare function customInitFunctions();

@Component({
  selector: 'app-perfiles-admin',
  templateUrl: './perfiles-admin.component.html',
  styleUrls: ['./perfiles-admin.component.css']
})
export class PerfilesAdminComponent implements OnInit {



  usuario: Usuario;

  cargando: boolean = true;

  formularios: Hojavida[]=[];

  totalRegistros: number = 0;
  constructor(private listainforme :HojavidaService , private router: Router) {



    window.location.href="#/dashboard/perfilesAdmin";

  }



  ngOnInit() {
   // customInitFunctions();
    this.getFormulariosOfertas();

  }










  getFormulariosOfertas() {



    this.listainforme.getOpciones().subscribe(
      result => {

         this.formularios =  result ;


       //  window.location.reload();
         this.cargando = false;

         console.log(this.formularios)
     });



}


postular(){
  console.log('estoy postulando')
   Swal.fire({
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

}



