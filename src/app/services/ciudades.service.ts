import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ciudad } from '../models/ciudad.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private opcionesUrl =  environment.base_url + '/localidades';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }
  getOpciones(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.opcionesUrl)
  }

  getOpcion(id: string): Observable<Ciudad> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Ciudad>(url);
  }

  addOpcion (proveedor: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteOpcion (opcion: Ciudad | string): Observable<Ciudad> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Ciudad>(url, httpOptions);
  }

  updateOpcion (proveedor: Ciudad): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }
}
