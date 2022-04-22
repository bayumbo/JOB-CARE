import { Hojavida } from './../models/hojavida';
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
export class HojavidaService {

  hojavida: Hojavida;

  private opcionesUrl2 =  environment.base_url + '/hojavida/insertar';
  
  private opcionesUrl3 =  environment.base_url + '/hojavida/premium';
  private opcionesUrl1 =  environment.base_url + '/hojavida/todos';
  private opcionesUrl =  environment.base_url + '/hojavida';  // URL to web api
  constructor(
    private http: HttpClient
  ) {

   
   }








 
   getOpciones(): Observable<Hojavida[]> {
    return this.http.get<Hojavida[]>(this.opcionesUrl1)
  }  

  getOpcionesPremium(): Observable<Hojavida[]> {
    return this.http.get<Hojavida[]>(this.opcionesUrl1)
  }  
  getHojavidaId(id: string): Observable<Hojavida> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Hojavida>(url);
  }

  getHojavida (usuario_id:string): Observable<Hojavida[]> {
    return this.http.get<Hojavida[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }


  addOpcion (proveedor: Hojavida): Observable<Hojavida> {
    return this.http.post<Hojavida>(this.opcionesUrl, proveedor, httpOptions);
  }

  addOpcion2 (proveedor: Hojavida): Observable<Hojavida> {
    return this.http.post<Hojavida>(this.opcionesUrl2, proveedor, httpOptions);
  }

  deleteOpcion (opcion: Hojavida | string): Observable<Hojavida> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Hojavida>(url, httpOptions);
  }

  updateOpcion (proveedor: Hojavida): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }


  buscarHojavida( termino: string ) {
    let url = `${ environment.base_url }/busqueda/coleccion/hojavida/${ termino }`;

    return this.http.get( url ).pipe(map((resp: any) => resp.hojavida ));
   
  }

}