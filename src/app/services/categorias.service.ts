import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  private opcionesUrl =  environment.base_url + '/categorias'; 
  constructor(private http: HttpClient) { }

  getOpciones(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.opcionesUrl)
  }

  getOpcion(id: string): Observable<Categoria> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Categoria>(url);
  }

  addOpcion (proveedor: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteOpcion (opcion: Categoria | string): Observable<Categoria> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Categoria>(url, httpOptions);
  }

  updateOpcion (proveedor: Categoria): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }

}
