import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../models/contactoPOstulante';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContactoPostulanteService {

  private opcionesUrl1 =  environment.base_url + '/Contacto/todos';
  private opcionesUrl =  environment.base_url + '/Contacto';  // URL to web api
  constructor(
    private http: HttpClient
  ) {


   }





  getContacto11(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.opcionesUrl1)
  }  

  getContactoId(id: string): Observable<Contacto> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Contacto>(url);
  }

  getContacto (usuario_id:string): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }



  addContacto (proveedor: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteContacto (opcion: Contacto | string): Observable<Contacto> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Contacto>(url, httpOptions);
  }

  updateContacto (proveedor: Contacto): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }


}
 
  