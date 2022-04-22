import { CiudadesService } from '../../../services/ciudades.service';
import { Ciudad } from '../../../models/ciudad.model';
import { Component, ElementRef, NgZone, OnInit, ViewChild, } from '@angular/core';

import Stepper from 'bs-stepper';
import { MapsAPILoader } from '@agm/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VerificacionService } from 'src/app/services/verificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { JoyrideService } from 'ngx-joyride';
import { Provincia } from 'src/app/models/Provincia.model';
import { Ciudades } from 'src/app/models/ciudades.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cuidado-adulto-empleador',
  templateUrl: './cuidado-adulto-empleador.component.html',
  styleUrls: ['./cuidado-adulto-empleador.component.css']
})
export class CuidadoAdultoEmpleadorComponent implements OnInit {

  msg;
  validarEamil;
  loading = false;
  buttionText = "Submit";
  Error;
  votes: number;
  email: any;

  mostarDatos: boolean;
  mostarDatossemana: boolean;
  mostarDatosmes: boolean;
  mostarDatosfijo: boolean;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  cate ='CUIDADO ADULTO MAYOR';
  rol ='EMPLEADOR_ROLE';

  @ViewChild('search')
  public searchElementRef: ElementRef;

  UsuarioModelo = new Usuario();
  //combo de la base de localidades
  ciuadadesOpcion: Ciudad[];
  ciudad: Ciudad;
  //=================================
  provincias: Provincia[] = [];
  val;
  ciudades: Ciudades[]=[];
  ciud
  //pasos del formulario en una sola pantalla
  private stepper: Stepper;

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  //===========================
  //Expresiones Regulares
  emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  // formulario de registro //
  public formSubmitted = false;

  public registerForm = this.fb.group({
   /*  usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], */
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required]],
    //clave: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(4)]],

    provincia: [''],
    ciudad: [''],
    direccion: ['', [Validators.required]],
    direccionmapa: [''],

    fecha: ['', [Validators.required]],
    categorias:[''],
    role:[''],
    experiencia: ['', [Validators.required]],

    adulto: this.fb.array([]),

    compania: false,
    alimentacion: false,
    actividades:false,
    paseo: false,
    tareas: false,


  })

  get adulto() {
    return this.registerForm.get('adulto') as FormArray;

  }

  agregarninos() {

    const adultoFormgroup = this.fb.group({

      masculino:false,
      femenino:false,
      edad: ['', [Validators.required]],


    });

    this.adulto.push(adultoFormgroup);

  }

  removerninos(indice: number) {

    this.adulto.removeAt(indice)

  }




  constructor(
    private ciudadOpcion: CiudadesService,
    private mapsAPILoader: MapsAPILoader,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private verificar: VerificacionService,
    private usuarioService: UsuarioService,
    private router: Router,
    private joyride: JoyrideService,
    private authService: AuthService,

    private ngZone: NgZone) {
    this.email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
    // this.to = new FormControl('', [Validators.required]);
    this.votes = this.votes || 0;
  }

  ngOnInit(): void {

    this.provincias = this.authService.getProvincias();
    this.ciudades = this.authService.getCiudades();



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
          this.zoom = 48;
        });
      });
    });


    this.getOpciones1();
    this.ciuadadesOpcion = new Array<Ciudad>();
    this.ciudad = new Ciudad();

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  changeFn(val) {
    this.val
    console.log(this.val,'esto es la provicncia')
  }
  changeFnCiu(ciud) {
    this.ciud
    console.log(this.ciud,'esto es la provicncia')
  }

  //metodo de las localidades taridas de la base
  getOpciones1() {
    return this.ciudadOpcion.getOpciones()
      .subscribe(
        ciudades => {
          //  console.log(ciudades);
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
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 28;
          this.address = results[0].formatted_address;
          console.log(this.address)
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  activar() {

    this.mostarDatos = true;
    this.mostarDatossemana = false;
    this.mostarDatosfijo = false;
    this.mostarDatosmes = false;

  }
  activar2() {
    this.mostarDatos = false;
    this.mostarDatosmes = false;
    this.mostarDatossemana = true;

  }
  activar3() {
    this.mostarDatossemana = false;

    this.mostarDatosfijo = false;
    this.mostarDatosmes = true;

  }
  activar4() {
    this.mostarDatosmes = false;
    this.mostarDatos = false;
    this.mostarDatosfijo = true;

  }
  desactivar() {

    this.mostarDatos = false;
    this.mostarDatossemana = false;
    this.mostarDatosfijo = false;
    this.mostarDatosmes = false;

  }
  voteUp(valor : number){

    if(this.votes >= 50 && valor >= 0){
      return this.votes = 50;
    }
    //  this.votes++;
    if(this.votes <= 0 && valor < 0){
      return this.votes = 0;
    }

     this.votes = this.votes + valor;

    this.agregarninos();
  }

  voteDown(valor: number) {

     //  this.votes++;
     if(this.votes <= 0 && valor < 0){
      return this.votes = 0;
    }
    this.votes = this.votes + valor;
    this.removerninos(0)
  }


  private url = environment.base_url;

  verificarEmail() {

    setTimeout(() => {
      this.verificar.sendEmail(this.url +'/codigo').subscribe(

        res => {

          this.msg = res['msg'];
          console.log(this.msg)
        }


      );

    }, 3000);

  };
  RevisandoEmail() {
    this.formSubmitted = true;
    this.spinner.show();
    let to = this.registerForm.value.email;
    console.log(to)
    this.verificar.Email(this.url+'/send', this.registerForm.value).subscribe(


      data => {
        this.spinner.hide();
        this.validarEamil = data['data'];
        console.log(data)


        if (this.validarEamil == "sent") {

          Swal.fire("Email enviado a " + to, "Se envío correo electrónico con su clave  Por favor revise la bandeja de entrada o spam!", "success")
          console.log('verifico')
        }

      });



    this.verificarEmail()
  }
  /*
   $(document).ready(function(){
         var from,to,subject,text;
         $("#send_email").click(function(){
             to=$("#to").val();
             $("#message").text("Enviando correo electrónico ... Espere");
             $.get(this.url+'/send',{to:to},function(data){
             console.log(data)
             if(data=="sent")
             {
                 $("#message").empty().text("El correo electrónico con su clave se envió a "+to+" Por favor revise la bandeja de entrada o spam !");
             }


     });
         });
     });
  */

  //====CREAR USUARIO==//

  verificando() {
    if (this.registerForm.value.clave != this.msg) {
      Swal.fire('Clave', 'Invalida revise su email o verifique nuevamente!', 'error');
      console.log('Error de clave')

      //  document.getElementById("habilitarBoton").style.display ="inline";
    } else {

      Swal.fire("Codigo verificado con  exito", "", "success")
      console.log('funciona la verificacion')
      this.crearUsuario();
    }
  }

  crearUsuario() {
    this.formSubmitted = true;

    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      return;
    }
      this.registerForm.value.provincia = this.val;
      this.registerForm.value.ciudad = this.ciud;
      this.registerForm.value.direccionmapa = this.address;
      this.registerForm.value.categorias = this.cate;
      this.registerForm.value.role = this.rol;
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
        resp => {

          Swal.fire("Registro  existoso", "", "success")
          console.log(resp);
          this.router.navigateByUrl('/login')
        }, (err) => {
          // Si sucede un error
          //  Swal.fire('Error', err['msg'], 'error' );

          Swal.fire('Error', err.error.msg, 'error');
          //this.router.navigateByUrl('/inicio')
        }

      )
    //  this.resetUsuario()


  }


  resetUsuario() {
    this.registerForm.reset()
  }


    //mensaje guia ================================//
    asistencia(){
      this.joyride.startTour(
        { steps: ['prota1', 'prota2'],
        customTexts: {
          next: 'SIGUIENTE',
          prev: 'ANTERIOR',
          done: 'CERRAR'
        }, themeColor: '#56c2c6',
        stepDefaultPosition: 'center',
      }
      )
    }

    asistencia2(){
      this.joyride.startTour(
        { steps: ['asi1', ],
        customTexts: {
          next: 'SIGUIENTE',
          prev: 'ANTERIOR',
          done: 'CERRAR'
        }, themeColor: '#56c2c6',
        stepDefaultPosition: 'left',
      }
      )
    }

    asistencia3(){
      this.joyride.startTour(
        { steps: ['asi2', ],
        customTexts: {
          next: 'SIGUIENTE',
          prev: 'ANTERIOR',
          done: 'CERRAR'
        }, themeColor: '#56c2c6',
        stepDefaultPosition: 'left',
      }
      )
    }
    asistencia4(){
      this.joyride.startTour(
        { steps: ['asi3', ],
        customTexts: {
          next: 'SIGUIENTE',
          prev: 'ANTERIOR',
          done: 'CERRAR'
        }, themeColor: '#56c2c6',
        stepDefaultPosition: 'left',
      }
      )
    }
    asistencia5(){
      this.joyride.startTour(
        { steps: ['asi4', ],
        customTexts: {
          next: 'SIGUIENTE',
          prev: 'ANTERIOR',
          done: 'CERRAR'
        }, themeColor: '#56c2c6',
        stepDefaultPosition: 'left',
      }
      )
    }

    campoNoValido(campo: string): boolean {

      if (this.registerForm.get(campo).invalid && this.formSubmitted) {

        return true
      } else {

        return false;
      }
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
