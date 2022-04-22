import { Mensaje } from 'src/app/models/mensaje';
import { Ofertas } from 'src/app/models/ofertas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

Ofertas: Ofertas;
private opcionesUrl3 =  environment.base_url + '/ofertas/crear';
private opcionesUrl2 =  environment.base_url + '/ofertas/insertar';
  private opcionesUrl1 =  environment.base_url + '/ofertas/todos';
  private opcionesUrl =  environment.base_url + '/ofertas';  // URL to web api
  private opcionesUrl5 =  environment.base_url + '/ofertas/premium';
  private opcionesUrl4 =  environment.base_url + '/ofertas/enviar/mensajes';  // URL to web api

  constructor(
    private http: HttpClient
  ) {


   }



   getOpcionesPremium(): Observable<Ofertas[]> {
    return this.http.get<Ofertas[]>(this.opcionesUrl5)
  }

  getOpcionesPrueba(): Observable<Ofertas[]> {
    return this.http.get<Ofertas[]>(this.opcionesUrl1)
  }


  getOpciones(): Observable<Ofertas[]> {
    return this.http.get<Ofertas[]>(this.opcionesUrl1)
  }

  getOfertasId(id: string): Observable<Ofertas> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Ofertas>(url);
  }

  getOfertas (usuario_id:string): Observable<Ofertas[]> {
    return this.http.get<Ofertas[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }

  addOpcionOfer (proveedor: Ofertas): Observable<Ofertas> {
    return this.http.post<Ofertas>(this.opcionesUrl3, proveedor, httpOptions);
  }

  addOpcion (proveedor: Ofertas): Observable<Ofertas> {
    return this.http.post<Ofertas>(this.opcionesUrl2, proveedor, httpOptions);
  }


 postu( id: string ) {
    let url = `${ environment.base_url }/oe/${ id }`;

    return this.http.post<Ofertas>(url, httpOptions);
  }

  deleteOpcion (opcion: Ofertas | string): Observable<Ofertas> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Ofertas>(url, httpOptions);
  }

  updateOpcion (proveedor: Ofertas): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }



  actualizaroferta( proveedor: Ofertas ) {
    let url = `${ this.opcionesUrl }/${ proveedor._id }`;

    return this.http.put(url, proveedor)
  }
  actualizaroferta1( proveedor: Ofertas, id ) {
    let url = `${ this.opcionesUrl }/${ proveedor._id }`;

    return this.http.put(url, proveedor, id)
  }


  buscarOfertas( termino: string ) {
    let url = `${ environment.base_url }/busqueda/coleccion/ofertas/${ termino }`;

    return this.http.get( url ).pipe(map((resp: any) => resp.ofertas ));

  }

  //====mensajes====================================
 addmensaje(proveedor: Mensaje): Observable<Mensaje>{

    return this.http.post<Mensaje>(this.opcionesUrl4, proveedor, httpOptions);
 }

}
