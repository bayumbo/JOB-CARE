import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CursosComprados } from '../models/cursosComprados';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CursosCompradosCompradosService {

  private opcionesUrl1 =  environment.base_url + '/cursosComprados/todos';
  private opcionesUrl =  environment.base_url + '/cursosComprados';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  getCursosComprados(): Observable<CursosComprados[]> {
    return this.http.get<CursosComprados[]>(this.opcionesUrl1)
  }

  getCursosCompradosId(id: string): Observable<CursosComprados> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<CursosComprados>(url);
  }

  getCursosid (usuario_id:string): Observable<CursosComprados[]> {
    return this.http.get<CursosComprados[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }





  addCursoComprado (proveedor: CursosComprados): Observable<CursosComprados> {
    return this.http.post<CursosComprados>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteCursoComprado(opcion: CursosComprados | string): Observable<CursosComprados> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<CursosComprados>(url, httpOptions);
  }

  updateCursoComprado(proveedor: CursosComprados): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }
}