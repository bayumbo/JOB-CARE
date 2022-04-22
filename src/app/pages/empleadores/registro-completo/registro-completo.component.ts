import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, NgZone, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-registro-completo',
  templateUrl: './registro-completo.component.html',
  styleUrls: ['./registro-completo.component.css']
})
export class RegistroCompletoComponent implements OnInit {
  usuario :Usuario;
  usuarioModelo= new Usuario();

  votes: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  ciuadadesOpcion: Ciudad[];
  ciudad: Ciudad;
 //combo de la base de localidades
  //pasos del formulario en una sola pantalla

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  //=================================

  opcionesGenerales: Categoria[]
  public notificacion = new EventEmitter<any>();
  constructor(
    public _usuarioServices: UsuarioService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private ciudadOpcion: CiudadesService,
    private opcionesServices: CategoriasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ) {
    this.usuario = this._usuarioServices.usuario;
    this.votes = this.votes || 0;

    this.notificacion.subscribe(
      resp  =>{
        console.log(resp,'emisor-1')
        const id = this.route.snapshot.paramMap.get('id');
        this._usuarioServices.getusuarioId(id)
        .subscribe(resp => {
          console.log(resp,'emisor-2')
  })
      })
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this._usuarioServices.getusuarioId(id)
      .subscribe(resp => {

        this.usuarioModelo = resp
            console.log( this.usuarioModelo,'Este es el perfil')
      });

      this.selected.valueChanges.subscribe(changes => {
        this.Opciones(changes);
      });

   this.getCategorias();
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


  }


  getCategorias() {
    return this.opcionesServices.getOpciones()
      .subscribe(
        opcionesGenerales => {

          this.opcionesGenerales = opcionesGenerales
        }
      );
  }
  public registerForm = this.fb.group({
   ninos: this.fb.array([])
 })
  get ninos() {
    return this.registerForm.get('ninos') as FormArray;

  }

  agregarninos() {

    const ninosFormgroup = this.fb.group({

      masculino: ['', ],
      femenino: ['', ],
      edad: ['', ],


    });

    this.ninos.push(ninosFormgroup);

  }

  removerninos(indice: number) {

    this.ninos.removeAt(indice)

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

  id

 update(): void {
  //this.submitted = true;

  this._usuarioServices.updateOpcion(this.usuarioModelo)
      .subscribe(result => {
        this.notificacion.emit(result);
        console.log(result)
        Swal.fire("Actualización de datos existoso", "", "success")
      });
}


//logica del formulario
mostrar = false;
mostrar2 = false;
mostrar3 = false;
mostrar4 = false;
mostrar5 = false;
mostrar6 = false;
mostrar7 = false;
mostrar8 = false;
mostrar9 = false;
mostrar10 = false;
mostrar11 = false;
mostrar12 = false;
selected: FormControl = new FormControl(null);
opc: any;


Opciones(opc) {

  this.opc;
  if (opc == "NIÑERAS") {

    this.opc = opc;
    console.log(this.opc,'NIÑERAS');
    this.mostrar = true
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 = false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  } else if (opc == "CUIDADO ADULTO MAYOR") {
    console.log("CUIDADO ADULTO MAYOR");
    this.opc = opc;
    this.mostrar = false;
    this.mostrar2 = true;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 = false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  } else if (opc == "SERVICIO DOMESTICO") {
    console.log("SERVICIO DOMESTICO");
    this.opc = opc;
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = true;
    this.mostrar4 = false;
    this.mostrar5 = false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  } else if (opc == "CUIDADO DE MASCOTAS") {
    console.log("CUIDADO DE MASCOTAS");
    this.opc = opc;
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = true;
    this.mostrar5 = false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  } else if (opc == "CUIDADOS CAPACIDADES ESPECIALES") {
    this.opc = opc;
    console.log("CUIDADOS CAPACIDADES ESPECIALES");
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 = true;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  }
  else if (opc == "TUTORIAS ESCOLARES") {
    this.opc = opc;
    console.log("TUTORIAS ESCOLARES");
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 = false;
    this.mostrar6 = true;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  }else if (opc == "TRABAJOS DEL HOGAR") {
    this.opc = opc;
    console.log("TRABAJOS DEL HOGAR");
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 =false;
    this.mostrar6 = false;
    this.mostrar7 = true;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  }else if (opc == "ASISTENCIA AUTOMOTRIZ") {
    this.opc = opc;
    console.log("ASISTENCIA AUTOMOTRIZ");
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 = false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = true;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  }else if (opc == "MENSAJERIA") {
    this.opc = opc;
    console.log("MENSAJERIA");
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 =false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = true;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = false;
  }else if (opc == "SPA") {
    this.opc = opc;
    console.log("SPA");
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 = false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = true;
    this.mostrar11 = false;
    this.mostrar12 = false;
  }else if (opc == "PROFESIONALES TITULADOS") {
    this.opc = opc;
    console.log("PROFESIONALES TITULADOS");
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 = false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = true;
    this.mostrar12 = false;
  }else if (opc == "OTROS") {
    this.opc = opc;
    console.log("OTROS");
    this.mostrar = false;
    this.mostrar2 = false;
    this.mostrar3 = false;
    this.mostrar4 = false;
    this.mostrar5 = false;
    this.mostrar6 = false;
    this.mostrar7 = false;
    this.mostrar8 = false;
    this.mostrar9 = false;
    this.mostrar10 = false;
    this.mostrar11 = false;
    this.mostrar12 = true;
  }
}

}
