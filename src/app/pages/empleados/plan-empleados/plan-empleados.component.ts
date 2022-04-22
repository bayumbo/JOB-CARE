import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Planempleados } from 'src/app/models/planEmpleados';
import { Usuario } from 'src/app/models/usuario.model';
import { PlanEmpleadosService } from 'src/app/services/plan-empleados.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-empleados',
  templateUrl: './plan-empleados.component.html',
  styleUrls: ['./plan-empleados.component.css']
})
export class PlanEmpleadosComponent implements OnInit {

  usuario: Usuario;
  planModelo = new Planempleados();
  formularios: Planempleados[]

  tipo = "Free"
  valor = "0.00"
  public registerForm = this.fb.group({

  })

  urlTree
  id
  type
  constructor(private planes: PlanEmpleadosService, private fb: FormBuilder, public _usuarioServices: UsuarioService, private listainforme: PlanEmpleadosService,
    private router: Router) {
    this.usuario = this._usuarioServices.usuario;

    this.urlTree = this.router.parseUrl(this.router.url);

    this.id = this.urlTree.queryParams['id'];
    this.type = this.urlTree.queryParams['clientTransactionId'];
    console.log(this.id, this.type, 'ESTOS SON LOS PARAMETROS')
  }

  ngOnInit(){


    this.getPlanOfertas() 
    if ( this.id == null) {
      return false
      }else{
        this.confirmacionPago();
      }
  }



  getPlanOfertas() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.listainforme.getPlan(usuario._id).subscribe(
      result => {
        this.formularios = result
        console.log(this.formularios)

      });
   }



  registrarPlan() {

    console.log(this.planModelo);
    // Realizar el posteo
    this.planModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
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

  apiPay
  rand
  ///===================prueba botton de pagos========================================//
  producto1() {

    this.rand = Math.floor((Math.random() * 1000) + 60000);

    let parametros = {
      amount: "599",
      amountWithoutTax: "599",
      clientTransactionID: this.rand,
      responseUrl: "http://localhost:4200/#/dashboard/planes/empleados",
      cancellationUrl: "http://localhost:4200/#/dashboard/planes/empleados"

    }
    console.log(parametros.responseUrl)
    this.planes.pagar(parametros).subscribe(resp => {


      this.apiPay = resp.payWithCard;

      window.location.href = this.apiPay;
    }, (err) => {

      Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

    })

  }

  producto2() {

    this.rand = Math.floor((Math.random() * 1000) + 90000);
    let parametros = {
      amount: "999",
      amountWithoutTax: "999",
      clientTransactionID: this.rand,
      responseUrl: "http://localhost:4200/#/dashboard/planes/empleados",
      cancellationUrl: "http://localhost:4200/#/dashboard/planes/empleados"

    }
    console.log(parametros)
    this.planes.pagar(parametros).subscribe(resp => {


      this.apiPay = resp.payWithCard;
      window.location.href = this.apiPay;
    }, (err) => {

      Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

    })

  }



  confirmacionPago() {



    let parametros = {
      id: this.id,
      clientTxId: this.type
    }

    if (this.id == 0) {
      Swal.fire('Transacción cancelada', 'vuelva intentar', 'error');
      return false
    } else {
      this.planes.getPago(parametros).subscribe(resp => {
        console.log(resp, 'si paga')
        resp.id
        resp.clientTransactionId

        Swal.fire("Pago realizado con exito", resp.clientTransactionId, "success")
      }, (err) => {

        // Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

      })

    }


  }

  registrarPlan3() {
    
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
