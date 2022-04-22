import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Postulacion } from '../models/postulacion';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  private opcionesUrl1 =  environment.base_url + '/postulacion/todos';
  private opcionesUrl =  environment.base_url + '/postulacion';  // URL to web api
  constructor(
    private http: HttpClient
  ) {


   }





  getPOstulacion(): Observable<Postulacion[]> {
    return this.http.get<Postulacion[]>(this.opcionesUrl1)
  }  

  getPostulacionId(id: string): Observable<Postulacion> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Postulacion>(url);
  }

  getPostulacion (usuario_id:string): Observable<Postulacion[]> {
    return this.http.get<Postulacion[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }



  addPostulacion (proveedor: Postulacion): Observable<Postulacion> {
    return this.http.post<Postulacion>(this.opcionesUrl, proveedor, httpOptions);
  }

  deletePOstulacion (opcion: Postulacion | string): Observable<Postulacion> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Postulacion>(url, httpOptions);
  }

  updatePOstulacion (proveedor: Postulacion): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }


}
 
  