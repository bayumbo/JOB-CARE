import { Hojavida } from '../../../models/hojavida';
import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';
import { HojavidaService } from 'src/app/services/hojavida.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-verhojavida-profesional',
  templateUrl: './verhojavida-profesional.component.html',
  styleUrls: ['./verhojavida-profesional.component.css']
})
export class VerhojavidaProfesionalComponent implements OnInit {

  usuario: Usuario;
  
  formularios: Hojavida[];
  ofertaModelo= new Hojavida();
  totalRegistros: number = 1;


  

  constructor(private _usuarioService: UsuarioService, private listainforme: HojavidaService
    ) {



      
     }
  ngOnInit() {

   
    this.usuario = this._usuarioService.usuario;
    this.getFormulariosHoja();
   
  }



 

  getFormulariosHoja() {

      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.getHojavida(usuario._id).subscribe(
        result => { 
           this.formularios =  result 

         //  localStorage.setItem("Hojavida",JSON.stringify(this.formularios) )
           console.log(this.formularios)
       });
      }


}
