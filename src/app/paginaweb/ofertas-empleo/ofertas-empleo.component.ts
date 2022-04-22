import { OfertaService } from './../../services/oferta.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { JoyrideService } from 'ngx-joyride';

declare function customInitFunctions();


@Component({
  selector: 'app-ofertas-empleo',
  templateUrl: './ofertas-empleo.component.html',
  styleUrls: ['./ofertas-empleo.component.css']
})
export class OfertasEmpleoComponent implements OnInit {



  usuario: Usuario;
  val
  cargando: boolean = true;

  formularios: Ofertas[];
  formularios2: Ofertas[];
  totalRegistros: number = 0;
  constructor(private listainforme : OfertaService, private joyride: JoyrideService,) {



   }

  ngOnInit(): void {

    this.getFormulariosOfertas()
    customInitFunctions();
  }

iniciar(){


 // window.location.reload();
 //reloadPage()
  console.log('holaaa')

}


  getFormulariosOfertas() {

    this.cargando = true;
    this.listainforme.getOpciones().subscribe(
     result => {
         this.formularios =  result

         this.cargando = false;

     });

     this.iniciar()
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
      '<i class="fa fa-thumbs-up"></i> <a href="#/home"><b style="color:#FBFBFB";> ENCONTRAR EMPLEO</b></a>',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: 'Thumbs down'
  })


 }

 changeFn(val) {
  this.val = val
 this.buscarOferta(this.val)
  console.log(this.val)
}
 buscarOferta( termino: string ) {

  if ( termino.length <= 0 ) {
    this.getFormulariosOfertas()
    return;
  }

  this.cargando = true;

  this.listainforme.buscarOfertas( termino )
          .subscribe( (ofertas: Ofertas[]) => {

            this.formularios = ofertas

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
