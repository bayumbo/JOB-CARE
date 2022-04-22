import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cursos } from 'src/app/models/cursos';
import { CursosComprados } from 'src/app/models/cursosComprados';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosCompradosCompradosService } from 'src/app/services/cursos-comprados.service';
import { CursosService } from 'src/app/services/cursos.service';
import { PlanesService } from 'src/app/services/planes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-generales',
  templateUrl: './cursos-generales.component.html',
  styleUrls: ['./cursos-generales.component.css']
})
export class CursosGeneralesComponent implements OnInit {
  formularios: Cursos[];
  ofertaModelo = new Cursos();
  totalRegistros: number = 1;
  cursos = new CursosComprados();
  ocultar = true
  urlTree
  id
  type


  usuario: Usuario;

  constructor(private listainforme: CursosService, private route: ActivatedRoute, private planes: PlanesService, public _usuarioServices: UsuarioService, private router: Router,
    private _cursos: CursosCompradosCompradosService
  ) {


    this.usuario = this._usuarioServices.usuario;
    this.urlTree = this.router.parseUrl(this.router.url);

    this.id = this.urlTree.queryParams['id'];
    this.type = this.urlTree.queryParams['clientTransactionId'];
  }
  ngOnInit() {



    this.getFormulariosOfertas();
    if (this.id == null) {
      return false
    } else {
      this.confirmacionPago();
    }
  }


  val2: number = 100

  resp: number
  multi(val1: number) {
    this.resp = val1 * this.val2

    console.log('EL RESULTADO', val1)
  }

  activar() {
    this.ocultar = true;

  }
  desactivar() {
    this.ocultar = false;


  }

  get myStyles(): any {

    return {
      'display': this.ocultar ? '' : 'none'

    }

  }


  getFormulariosOfertas() {


    this.listainforme.getCursos().subscribe(
      result => {
        this.formularios = result
        console.log(this.formularios, 'VIENDO LOS CURSOS')
      });



  }

  apiPay
  rand
  //
  producto() {

    this.rand = Math.floor((Math.random() * 1000) + 90000);
    let parametros = {
      amount: this.resp,
      amountWithoutTax: this.resp,
      clientTransactionID: this.rand,
      responseUrl: environment.URL_SERVICIOS + "/#/dashboard/cursosEmpleadores",
      cancellationUrl: environment.URL_SERVICIOS + "/#/dashboard/cursosEmpleadores"

    }

    this.planes.pagar(parametros).subscribe(resp => {


      this.apiPay = resp.payWithCard;
      window.location.href = this.apiPay;
    }, (err) => {

      Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

    })

  }


  //======================Confirmacion de pago para registro en la base =============//

  //variables de pago
  cantidad
  clientTId
  parametro1
  parametro2
  referencia
  confirmacionPago() {


    let parametros = {
      id: this.id,
      clientTxId: this.type
    }

    if (this.id == 0 || this.id == '') {
      Swal.fire('Transacción cancelada', 'vuelva intentar', 'error');
      return false
    } else {
      this.planes.getPago(parametros).subscribe(resp => {

        this.cantidad = resp.amount
        this.clientTId = resp.clientTransactionId
        this.parametro1 = resp.optionalParameter1
        this.parametro2 = resp.optionalParameter2
        this.referencia = resp.reference
        Swal.fire("Pago realizado con exito", resp.clientTransactionId, "success")

        setTimeout(() => {

          this.cursoComprado()
          console.log('PORQUE NO REGISTRA EL PLAN')

        }, 3000);


      }, (err) => {

        // Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');
      })
    }
  }

//==========================CURSOS COMPRADOS==============================================//

datosCurso(titulo:string,categoria:string,descripcion: string,valor:string ){
  localStorage.setItem("titulo",titulo )
  localStorage.setItem("categoria",categoria)
  localStorage.setItem("descripcion",descripcion)
  localStorage.setItem("valor",valor)


}

cursoComprado(){
  this.cursos.tituloCurso =  localStorage.getItem('titulo')
  this.cursos.categorias = localStorage.getItem('categoria')
  this.cursos.descripcionCurso =localStorage.getItem('descripcion')
  this.cursos.valor = localStorage.getItem('valor')
  this.cursos.emailusuario= this.usuario.email
  this.cursos.telefono= this.usuario.telefono
  this.cursos.usuario =JSON.parse(localStorage.getItem('usuario')) as Usuario;
  this._cursos.addCursoComprado(this.cursos).subscribe(resp =>{
    Swal.fire("Pago realizado con exito", '', "success")
    console.log(resp)
  })




}
}

