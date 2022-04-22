import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from 'src/app/models/cursos';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {


  formularios: Cursos[];
  ofertaModelo= new Cursos();
  totalRegistros: number = 1;

 ocultar = true


  constructor( private listainforme: CursosService,private route: ActivatedRoute,
    ) { }
  ngOnInit() {



    this.getFormulariosOfertas();

  }

  activar(){
    this.ocultar = true;

  }
  desactivar(){
    this.ocultar = false;


  }

   get myStyles(): any {

        return {
            'display' : this.ocultar ? '': 'none'

        }

    }


  getFormulariosOfertas() {


      this.listainforme.getCursos().subscribe(
        result => {
           this.formularios =  result
           console.log(this.formularios)
       });



  }

  postular(){

    Swal.fire({
      title: '<strong>ES NECESARIO REGISTRARSE</strong>',
      icon: 'info',
      html:

        '<a href="#/capacitarse"><button class="btn btn-outline-primary" >REGISTRARSE EN UN CURSO</button></a><br>  '+
        '<br> <a href="#/contacto"><button class="btn btn-outline-primary" >PARA PUBLICAR UN CURSO</button></a> ',
      showCloseButton: true,

      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> OK',
      confirmButtonAriaLabel: 'Thumbs up, great!',

    })


  }



}
