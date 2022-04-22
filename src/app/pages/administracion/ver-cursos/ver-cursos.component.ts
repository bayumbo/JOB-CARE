import { CursosService } from 'src/app/services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { Cursos } from 'src/app/models/cursos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-cursos',
  templateUrl: './ver-cursos.component.html',
  styleUrls: ['./ver-cursos.component.css']
})
export class VerCursosComponent implements OnInit {


  formularios: Cursos[];
  ofertaModelo= new Cursos();
  totalRegistros: number = 1;


  

  constructor( private listainforme: CursosService,private route: ActivatedRoute,
    ) { }
  ngOnInit() {

   

    this.getFormulariosOfertas();
 
  }


 

  getFormulariosOfertas() {

  
      this.listainforme.getCursos().subscribe(
        result => { 
           this.formularios =  result 
           console.log(this.formularios)
       });

    
 
  }
}