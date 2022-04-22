import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cursos } from '../models/cursos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private opcionesUrl1 =  environment.base_url + '/cursos';
  private opcionesUrl =  environment.base_url + '/cursos';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  getCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.opcionesUrl1)
  }

  getCursosId(id: string): Observable<Cursos> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Cursos>(url);
  }





  addCurso (proveedor: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteCurso(opcion: Cursos | string): Observable<Cursos> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Cursos>(url, httpOptions);
  }

  updateCurso(proveedor: Cursos): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }

}
