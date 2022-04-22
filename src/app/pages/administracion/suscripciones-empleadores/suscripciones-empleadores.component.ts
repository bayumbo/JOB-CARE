import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/planes';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
  selector: 'app-suscripciones-empleadores',
  templateUrl: './suscripciones-empleadores.component.html',
  styleUrls: ['./suscripciones-empleadores.component.css']
})
export class SuscripcionesEmpleadoresComponent implements OnInit {

  formularios: Plan[]

  constructor( private listainforme: PlanesService,) { }

  ngOnInit(): void {
    this.getPlanesEmpleados()
  }



  getPlanesEmpleados() {

   
    this.listainforme.getPlanesTodos().subscribe(
      result => {
        this.formularios = result
        console.log(this.formularios)

      });
   }
}
