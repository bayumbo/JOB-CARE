import { Component, OnInit } from '@angular/core';
import { CursosComprados } from 'src/app/models/cursosComprados';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosCompradosCompradosService } from 'src/app/services/cursos-comprados.service';

@Component({
  selector: 'app-cursos-comprados',
  templateUrl: './cursos-comprados.component.html',
  styleUrls: ['./cursos-comprados.component.css']
})
export class CursosCompradosComponent implements OnInit {


  usuario: Usuario;
  
  formularios: CursosComprados[];
  ofertaModelo= new CursosComprados();
  totalRegistros: number = 1;

  constructor( private listainforme: CursosCompradosCompradosService,
    ) { }
  ngOnInit() {

   

    this.getFormulariosCursos();
 
  }


 

  getFormulariosCursos() {

  
      this.listainforme.getCursosComprados().subscribe(
        result => { 
           this.formularios =  result 
           console.log(this.formularios)
       });

    
 
  }
}