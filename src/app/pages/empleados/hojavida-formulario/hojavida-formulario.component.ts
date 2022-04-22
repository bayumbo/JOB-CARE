import { Categoria } from '../../../models/categoria.model';
import { CategoriasService } from '../../../services/categorias.service';

import { Component, ElementRef, EventEmitter, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import Stepper from 'bs-stepper';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';

import { NgxSpinnerService } from 'ngx-spinner';
import { Ciudad } from 'src/app/models/ciudad.model';
import { CiudadesService } from 'src/app/services/ciudades.service';


import { UsuarioService } from 'src/app/services/usuario.service';
import { HojavidaService } from 'src/app/services/hojavida.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanEmpleadosService } from 'src/app/services/plan-empleados.service';
import { Hojavida } from 'src/app/models/hojavida';

import { Planempleados } from 'src/app/models/planEmpleados';
import { DomSanitizer } from '@angular/platform-browser';
import { DragdropService } from 'src/app/services/dragdrop.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hojavida-formulario',
  templateUrl: './hojavida-formulario.component.html',
  styleUrls: ['./hojavida-formulario.component.css']
})
export class HojavidaFormularioComponent implements OnInit {




  urlPDF: string;

  fileArr = [];
  imgArr = [];
  fileObj = [];

  msg: string;
  progress: number = 0;

  votes: number = 0;
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: any;
  hojaModelo = new Hojavida();
  opcionesGenerales: Categoria[]
  ofertaModelo = new Ofertas();
  estado = 'NO PUBLICADO';
  estado2 = 'PUBLICADO';
  estatus = 'HOJA CREADA'
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  tipo = "Free";
  valor = "0.00";
  formu: Planempleados[]
  planModelo = new Planempleados();
  ciuadadesOpcion: Ciudad[];
  ciudad: Ciudad;
  formularios: Hojavida[];
  //pasos del formulario en una sola pantalla
  private stepper: Stepper;

  next() {
    this.stepper.next();

    // this.actualizarpagina()
  }

  previus() {
    this.stepper.previous();

  }

  onSubmit() {
    return false;
  }

  public formSubmitted = false;
  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    refSalarial: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    edad: ['', [Validators.required]],
    genero: ['',[Validators.required]],
    ocupacion: ['',[Validators.required]],
    descripcion: ['',[Validators.required]],
    categorias: ['',[Validators.required]],
    provincia: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    direccionmapa: ['',],
    experiencia: ['', [Validators.required]],
    descripcionExperiencia: ['', [Validators.required]],

    nivelEducacion: [''],
    telefonohoja: [''],

    estado: [''],
    usuario: [''],
    img2: [''],

    //referencia1
    nombreRef1: [''],
    cargoRef1: [''],
    empresaRef1: [''],
    telefonoRef1: [''],
    //referencia1
    nombreRef2: [''],
    cargoRef2: [''],
    empresaRef2: [''],
    telefonoRef2: [''],

    //referencia1
    nombreRef3: [''],
    cargoRef3: [''],
    empresaRef3: [''],
    telefonoRef3: [''],
    tipoplan: [''],

    avatar: [null],
    urlPdf: [''],
    emailHoja:[''],
    estatus:['']
    //  lavado: ['',],
    //  comida: ['',],
    //  limpieza: ['',],
    //  tareas: ['',],
    //  fechaNacimiento: ['', [Validators.required]],






  })

  urlTree
  id
  type

  public notificacion = new EventEmitter<any>();
  constructor(
     private mapsAPILoader: MapsAPILoader,
     private fb: FormBuilder,
     private ngZone: NgZone,
     private spinner: NgxSpinnerService,
    private opcionesServices: CategoriasService, private ciudadOpcion: CiudadesService, public _usuarioServices: UsuarioService,
    private _hojavida: HojavidaService, private router: Router, private planes2: PlanEmpleadosService, private sanitizer: DomSanitizer, private route: ActivatedRoute,
    public dragdropService: DragdropService, private toastr: ToastrService) {
    this.usuario = this._usuarioServices.usuario;

    this.urlTree = this.router.parseUrl(this.router.url);

    this.id = this.urlTree.queryParams['id'];
    this.type = this.urlTree.queryParams['clientTransactionId'];
    this.planRegistro

    this.notificacion.subscribe(
      resp =>
      this.getFormulariosHoja()

    )
    this.getPlanOfertas()
    this.notificacion.subscribe(
      resp =>
      this.getPlanOfertas()
    )
  }

  ngOnInit() {


   this.cf()


    this.getPlanOfertas()
    this.getFormulariosHoja()



    this.getOpciones2();
    this.ciuadadesOpcion = new Array<Ciudad>();
    this.ciudad = new Ciudad();

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 48;
        });
      });
    });

    this.getOpciones1()

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })

    if ( this.id == null) {
      return false
      }else{
        this.confirmacionPago();
      }
  }

  //====================traer los planes registrados para verificar la publicacion =======//
  IDPLAN
  planRegistro
  getPlanOfertas() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.planes2.getPlan(usuario._id).subscribe(
      result => {
        this.formu = result

        for (var form in result) {
          this.planRegistro = result[form].tipoPlan;
          this.IDPLAN = result[form]._id


      /*    if (this.planRegistro == 'Free' || this.planRegistro == 'Premium (3 meses)' || this.planRegistro == 'Premium (6 meses)') {
            this.updateEstado()
              Swal.fire("HOJA DE VIDA PUBLICADA CON EXITO", "Porque ya estas suscrito a uno de nuestros planes", "success")
          } else if (this.planRegistro == null) {
            Swal.fire("Para publicar ", "Debes suscribirte a uno de nuestros planes si ya estas suscrito omite este mensaje o suscribete en el paso 3", "warning")
          }  */


          //   Swal.fire("Para publicar ", "Debes suscribirte a uno de nuestros planes", "warning")

        }




      });
  }

  //metodo  categorias
  //opciones generales
  getOpciones1() {
    return this.opcionesServices.getOpciones()
      .subscribe(
        opcionesGenerales => {

          this.opcionesGenerales = opcionesGenerales
        }
      );
  }


  getOpciones2() {
    return this.ciudadOpcion.getOpciones()
      .subscribe(
        ciudades => {

          this.ciuadadesOpcion = ciudades;
          if (this.ciuadadesOpcion.length > 0) {
            this.ciudad = this.ciuadadesOpcion[0];
          }

        });

  }

  selectProvincia(provincia) {

    this.ciudad = this.ciuadadesOpcion.find(element => element.provincia == provincia);

  }

  //==================================================================//
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  markerDragEnd($event: google.maps.MouseEvent) {

    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 28;
          this.address = results[0].formatted_address;

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  ocultar = true

  get myStyles(): any {

    if(this.OJO =="HOJA CREADA"){
     this.ocultar = false

    }

    return {
        'display' : this.ocultar ? '': 'none'

    }

}


  crearUsuarioHoja() {


    this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.registerForm.value.estado = this.estado
    this.registerForm.value.telefonohoja = this.usuario.telefono

    this.registerForm.value.emailHoja= this.usuario.email
    this.registerForm.value.img2 = this.usuario.img;
    this.registerForm.value.tipoPlan = this.planRegistro
    this.registerForm.value.urlPdf = this.urlPDF;
    this.registerForm.value.estatus = this.estatus;
    this.formSubmitted = true;


    if (this.registerForm.invalid) {
      return;
    }
    this._hojavida.addOpcion(this.registerForm.value).subscribe(
      resp => {



        Swal.fire("Registro  existoso", "", "success")
           this.notificacion.emit( resp );
        // this.getFormulariosHoja();
  /*    if (this.planRegistro == 'Free' || this.planRegistro == 'Premium (3 meses)' || this.planRegistro == 'Premium (6 meses)') {
          this.updateEstado()
          //  Swal.fire("HOJA DE VIDA PUBLICADA CON EXITO", "Porque ya estas suscrito a uno de nuestros planes", "success")
        } else if (this.planRegistro == null) {
          Swal.fire("Para publicar ", "Debes suscribirte a uno de nuestros planes si ya estas suscrito omite este mensaje o suscribete en el paso 3", "warning")
        }  */



      }, (err) => {
        // Si sucede un error
        //  Swal.fire('Error', err['msg'], 'error' );
        Swal.fire('Error', err.error.msg, 'error');

      }

    )
     this.resetUsuario()

  }
  resetUsuario() {
    this.registerForm.reset()

   // this.getFormulariosHoja();

   setTimeout(() => {
  //  window.location.reload()
    this.next()
 },3000);

  }

  update(): void {
    //this.submitted = true;
    this.hojaModelo.urlPdf = this.urlPDF;
    this._hojavida.updateOpcion(this.hojaModelo)
      .subscribe(result => {
        console.log(result)
        Swal.fire("Actualización de Hoja de vida existoso", "", "success")
      });
  }

  //========================Trae la Hoja de Vida Guardada y muestra el previo en el steper==============================//
 public ID;
  planregistrado
  OJO
  getFormulariosHoja() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this._hojavida.getHojavida(usuario._id).subscribe(
      result => {
      //  this.notificacion.emit(result);
        this.formularios = result

        //  localStorage.setItem("Hojavida",JSON.stringify(this.formularios) )
        console.log(this.formularios, 'esto llega')
        for (var form in result) {
          this.ID = result[form]._id
          this.OJO= result[form].estatus
          console.log(this.OJO,'siesta')
          localStorage.setItem("idHoja",JSON.stringify(this.ID) )
          this.planregistrado = result[form].tipoplan
//  Swal.fire("HOJA DE VIDA PUBLICADA CON EXITO", "Porque ya estas suscrito a uno de nuestros planes", "success")
}});
  }

  //=================Actualiza el estado de la publicacion de la hoja de vida una vez que se realiza el pago ===//



  actualizarpagina() {
    window.location.reload()
  }






  valor1 = '5.99'
  valor2 = '9.99'

  PlanHoja
  registrarPlanGeneral() {


    // Realizar el posteo
    // this.planModelo.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.planModelo._id = this.IDPLAN;
    this.planModelo.amount = this.cantidad;
    if (this.cantidad == "599") {
      this.planModelo.tipoPlan = this.paquete
      this.planModelo.valor = this.valor1
      this.planModelo.fecha1 = new Date ()
      this.planModelo.fecha2 = (this.date.getFullYear().toString() + '-' + ("0" + (this.date.getMonth() + 3)).slice(-2) + '-' + ("0" + (this.date.getDate() + 1)).slice(-2));
    }
    else if (this.cantidad == "999") {
      this.planModelo.tipoPlan = this.paquete2
      this.planModelo.valor = this.valor2
      this.planModelo.fecha1 = new Date ()
      this.planModelo.fecha2 = (this.date.getFullYear().toString() + '-' + ("0" + (this.date.getMonth() + 6)).slice(-2) + '-' + ("0" + (this.date.getDate() + 1)).slice(-2));
    }
    this.planModelo.clientTransactionId = this.clientTId
    this.planModelo.optionalParameter1 = this.parametro1
    this.planModelo.optionalParameter2 = this.parametro2
    this.planModelo.reference = this.referencia
    //  this.planModelo.tipoPlan =
    this.planes2.updatePlan(this.planModelo).subscribe(
      resp => {
        this.notificacion.emit(resp);
        this.PlanHoja = resp.tipoPlan

        Swal.fire("Suscrito a Plan ", resp.tipoPlan, "success")
        setTimeout(() => {

          this.next()
          }, 2000);

      }, (err) => {

        Swal.fire(this.planModelo.usuario.usuario, 'Ya estas sucscrito a plan' + err.error.msg, 'error');

      })

  }

  seleccionaImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;


    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemporal = reader.result;

    }
  }

  cambiarImagen() {

    this._usuarioServices.cambiarImagen(this.imagenSubir, this.usuario._id)
  }


  ///===================prueba botton de pagos========================================//
  apiPay
  rand
  //
  paquete = 'Premium (3 meses)'
  producto1() {

    this.rand = Math.floor((Math.random() * 1000) + 60000);

    let parametros = {
      amount: "599",
      amountWithoutTax: "599",
      clientTransactionID: this.rand,
      responseUrl:environment.URL_SERVICIOS + "/#/dashboard/hojavida",
      cancellationUrl:environment.URL_SERVICIOS + "/#/dashboard/hojavida"

    }

    this.planes2.pagar(parametros).subscribe(resp => {


      this.apiPay = resp.payWithCard;

      window.location.href = this.apiPay;
    }, (err) => {

      Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

    })

  }


  paquete2 = 'Premium (6 Meses)'
  producto2() {

    this.rand = Math.floor((Math.random() * 1000) + 90000);
    let parametros = {
      amount: "999",
      amountWithoutTax: "999",
      clientTransactionID: this.rand,
      responseUrl: environment.URL_SERVICIOS + "/#/dashboard/hojavida",
      cancellationUrl:environment.URL_SERVICIOS + "/#/dashboard/hojavida"

    }

    this.planes2.pagar(parametros).subscribe(resp => {


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
      this.planes2.getPago(parametros).subscribe(resp => {

        this.cantidad = resp.amount
        this.clientTId = resp.clientTransactionId
        this.parametro1 = resp.optionalParameter1
        this.parametro2 = resp.optionalParameter2
        this.referencia = resp.reference
        Swal.fire("Pago realizado con exito", resp.clientTransactionId, "success")
        this.registrarPlan()
        this.registrarPlanGeneral()
        setTimeout(() => {

          this.updateEstado()

          this.registrarPlanGeneral()

          //  this.registrarPlan()


        }, 3000);


      }, (err) => {

        // Swal.fire('NO SE PROCESO EL PAGO', err.error.msg, 'error');

      })
    }


  }

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {

      return true
    } else {

      return false;
    }
  }


  //=======================subir archivos===========================//


  upload(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    })

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item)
    })

    // Set files form control
    this.registerForm.patchValue({
      avatar: this.fileObj
    })

    this.registerForm.get('avatar').updateValueAndValidity()

    // Upload to server
    this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.dragdropService.addFiles(this.registerForm.value.avatar)


      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('Documento cargado exitosamente!', event.body);
            this.urlPDF = event.body.userCreated.avatar[0];
            console.log(this.urlPDF, 'aquie se inserto')
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = "Documento cargado exitosamente!"
            }, 3000);
        }
      })
  }

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  updateEstado() {
    this.hojaModelo._id = JSON.parse(localStorage.getItem('idHoja')) ;

    this.hojaModelo.estado = this.estado2;
    this.hojaModelo.tipoplan = this.planRegistro;


    this._hojavida.updateOpcion(this.hojaModelo)
      .subscribe(result => {

          console.log(result,'UPDATE')
          this.notificacion.emit(result);
        Swal.fire("HOJA DE VIDA PUBLICADA CON EXITO", "", "success")
        // window.location.reload()
      });
  }

date
fecha2
  cf(){
    this.date = new Date();

   this.fecha2 =(this.date.getFullYear().toString() + '-' + ("0" + (this.date.getMonth() + 3)).slice(-2) + '-' + ("0" + (this.date.getDate() + 1)).slice(-2));

  }

  show() {
    this.toastr.info('Si ya estas suscrito a un plan en este paso esta el boton de publicar !', 'Hola');
  }

  registrarPlan() {


    // Realizar el posteo
      this.planModelo.usuario =JSON.parse(localStorage.getItem('usuario')) as Usuario;

      this.planModelo.amount = this.cantidad;

      this.planModelo.fecha1 = new Date ()
      this.planModelo.tipoPlan = this.tipo
      this.planModelo.valor = this.valor

      if (this.cantidad == "599") {
        this.planModelo.tipoPlan = this.paquete
        this.planModelo.valor = this.valor1
        this.planModelo.fecha1 = new Date ()
        this.planModelo.fecha2 = (this.date.getFullYear().toString() + '-' + ("0" + (this.date.getMonth() + 3)).slice(-2) + '-' + ("0" + (this.date.getDate() + 1)).slice(-2));
      }

      else if (this.cantidad == "999") {
        this.planModelo.tipoPlan = this.paquete2
        this.planModelo.valor = this.valor2
        this.planModelo.fecha1 = new Date ()
        this.planModelo.fecha2 = (this.date.getFullYear().toString() + '-' + ("0" + (this.date.getMonth() + 6)).slice(-2) + '-' + ("0" + (this.date.getDate() + 1)).slice(-2));

      }
      this.planModelo.clientTransactionId = this.clientTId
      this.planModelo.optionalParameter1 = this.parametro1
      this.planModelo.optionalParameter2 = this.parametro2
      this.planModelo.reference = this.referencia
      console.log(this.planModelo,'Que es lo que se va')
      this.planes2.addPlan(this.planModelo).subscribe(
        resp => {
         console.log(resp,'RESPUESTA')
          Swal.fire("Suscrito a Plan",resp.tipoPlan, "success")
          this.notificacion.emit(resp);
          setTimeout(() => {

            this.next()
            }, 2000);
        }, (err) => {

          Swal.fire(this.planModelo.usuario.usuario, err.error.msg, 'error');
          this.registrarPlanGeneral()
        })

      }


  verSeleccion: string = '';
  public opcion : string = '0'
  capturar(){
    this.verSeleccion = this.opcion;
  }
  verSeleccion1: string = '';
  public opcion1 : string = '0'
  capturar1(){
    this.verSeleccion1 = this.opcion1;
  }
}
