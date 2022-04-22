import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ofertas } from 'src/app/models/ofertas';

import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Ciudad } from 'src/app/models/ciudad.model';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { PlanesService } from 'src/app/services/planes.service';
import { Plan } from 'src/app/models/planes';
import { Usuario } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-editar-ofertas2',
  templateUrl: './editar-ofertas2.component.html',
  styleUrls: ['./editar-ofertas2.component.css']
})
export class EditarOfertas2Component implements OnInit {

  ofertaModelo= new Ofertas();
  opcionesGenerales: Categoria[]
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  plan :Plan[]
  @ViewChild('search')
  public searchElementRef: ElementRef;


  ciuadadesOpcion: Ciudad[];
  ciudad: Ciudad;

  public registerForm = this.fb.group({
    tituloEmpleo: ['', [Validators.required]],
    descripcionEmpleo: ['', [Validators.required]],
    remuneracion: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    horario: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    usuario:[''],
    estado:[''],
    categorias:[''],
     provincia: ['', [Validators.required]],
     ciudad: ['', [Validators.required]],
  //  direccionmapa: ['', [Validators.required]],
  //  lavado: ['',],
  //  comida: ['',],
  //  limpieza: ['',],
  //  tareas: ['',],
  //  fecha: ['', [Validators.required]],






  })

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private oferta : OfertaService,
    private opcionesServices : CategoriasService,
    private location: Location,
    private ciudadOpcion: CiudadesService,
    private planes : PlanesService,
    ) {
      this.getPalnEmpeadores();

      }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.oferta.getOfertasId(id)
      .subscribe(resp => {
        this.ofertaModelo = resp
          console.log(resp,'id con datos')
      });

      this.getOpciones1();
      this.getOpciones2();
     this.ciudad = new Ciudad();
     this.ciuadadesOpcion = new Array<Ciudad>();

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


  }



  getOpciones2() {
    return this.ciudadOpcion.getOpciones()
      .subscribe(
        ciudades => {
            console.log(ciudades);
          this.ciuadadesOpcion = ciudades;

          if (this.ciuadadesOpcion.length > 0) {
            this.ciudad = this.ciuadadesOpcion[0];
          }

        });

  }

  selectProvincia(provincia) {

    this.ciudad = this.ciuadadesOpcion.find(element => element.provincia == provincia);

  }

  getOpciones1() {
    return this.opcionesServices.getOpciones()
      .subscribe(
        opcionesGenerales => {
          console.log(opcionesGenerales);
          this.opcionesGenerales = opcionesGenerales
        }
      );
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





  update(): void {
    //this.submitted = true;
    this.oferta.updateOpcion(this.ofertaModelo)
        .subscribe(result => {
          console.log(result)
          Swal.fire("Actualización de oferta existoso", "", "success")
        });
  }

  updateEstado(): void {
    //this.submitted = true;


    this.oferta.updateOpcion(this.ofertaModelo)
        .subscribe(result => {
          console.log(result)
          Swal.fire("Actualización de Publicación existoso", "", "success")
        });
  }
  pub= 'PUBLICADO'
  updateEstado2(): void {
    //this.submitted = true;
    this.ofertaModelo.estado =  this.pub;
    this.oferta.updateOpcion(this.ofertaModelo)
        .subscribe(result => {
          console.log(result)
          Swal.fire("Actualización de Publicación existoso", "", "success")
        });
  }


  eliminar(){
    Swal.fire({
      title: 'Esta seguro de eliminar su oferta de empleo?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'Si, ELIMINAR'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete()
        Swal.fire(
          'Oferta de empleo !',
          'ha sido eliminada.',
          'success'
        )
      }
    })


  }

  delete(): void {
 //   this.submitted = true;
    this.oferta.deleteOpcion(this.ofertaModelo._id)
        .subscribe(
          result => {


            console.log(result)
        });
        this.goBack()
  }
  goBack(): void {
    this.location.back();
  }
  atras(): void {
    this.location.back();
  }

  planregistrado
  IDPLAN
  getPalnEmpeadores() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.planes.getPlan(usuario._id).subscribe(
      result => {
         this.plan =  result

         console.log(result,'ESTE ES EL PLAN')
         for (var form in result) {
          this.planregistrado = result[form].tipoPlan;
          this.IDPLAN = result[form]._id

        /*  if (this.planregistrado == 'Free' || this.planregistrado == 'Premium (3 meses)' || this.planregistrado == 'Premium (6 meses)') {
            this.updateEstado()
            //  Swal.fire("HOJA DE VIDA PUBLICADA CON EXITO", "Porque ya estas suscrito a uno de nuestros planes", "success")
          } else if (this.planregistrado == null) {
            Swal.fire("Para publicar ", "Debes suscribirte a uno de nuestros planes si ya estas suscrito omite este mensaje o suscribete en el paso 3", "warning")
          } */
         }


     });

}
}
