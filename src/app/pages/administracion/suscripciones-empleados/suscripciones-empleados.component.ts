import { Component, OnInit } from '@angular/core';
import { Planempleados } from 'src/app/models/planEmpleados';
import { PlanEmpleadosService } from 'src/app/services/plan-empleados.service';

@Component({
  selector: 'app-suscripciones-empleados',
  templateUrl: './suscripciones-empleados.component.html',
  styleUrls: ['./suscripciones-empleados.component.css']
})
export class SuscripcionesEmpleadosComponent implements OnInit {


  formularios: Planempleados[]

  constructor( private listainforme: PlanEmpleadosService,) { }

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
