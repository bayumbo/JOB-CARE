import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Plan } from 'src/app/models/planes';
import { Usuario } from 'src/app/models/usuario.model';

import { PlanesService } from 'src/app/services/planes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {


  usuario: Usuario;
 planModelo = new Plan();
 formularios :Plan[]

  tipo = "Free"
  valor= "0.00"
  public registerForm = this.fb.group({

  })

  constructor(private planes : PlanesService, private fb: FormBuilder, public _usuarioServices: UsuarioService,private listainforme: PlanesService ) {
    this.usuario = this._usuarioServices.usuario;
   }

  ngOnInit(): void {

  
     this.getFormulariosOfertas()
  }



  getFormulariosOfertas() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.listainforme.getPlan(usuario._id).subscribe(
      result => { 
         this.formularios =  result 
         console.log(this.formularios,'planess')
   
     });

  

}



  registrarPlan() {
    
    console.log( this.planModelo);
  // Realizar el posteo
    this.planModelo.usuario =JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.planModelo.tipoPlan = this.tipo
    this.planModelo.valor = this.valor
    this.planes.addPlan(this.planModelo).subscribe(
      resp => {
       
        Swal.fire("Suscrito a Plan Free", "", "success")
        console.log(resp);
       
      }, (err) => {
        
        Swal.fire(this.planModelo.usuario.usuario, err.error.msg, 'error');
  
      })
 
    }




}
