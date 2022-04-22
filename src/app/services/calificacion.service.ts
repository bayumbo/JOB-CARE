import { Calificacion } from 'src/app/models/calficacion.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private uri =  environment.base_url;
  private uri2 =  environment.base_url + '/calificacion/post';

 
  constructor(private http: HttpClient) { }

  create (json: any, url: string): Observable<any> {
    return this.http.post<any>(`${this.uri}/${url}`,json, httpOptions);
  }

  createHoja (json: any, url: string): Observable<any> {
    return this.http.post<any>(`${this.uri}/${url}`,json, httpOptions);
  }

  get(url: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.uri}/${url}`, httpOptions);
  }

  getOne(url: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.uri}/${url}`, httpOptions);
  }

  descargar(url: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.uri}/${url}`, { headers, responseType: 'blob' as 'json'});
  }

  updateOpcion (json: any, url: string): Observable<any> {
    return this.http.put(`${this.uri}/${url}`, json, httpOptions);
  }

  deleteOpcion(url: string): Observable<any> {
    return this.http.delete<any>(`${this.uri}/${url}`, httpOptions);
  }

  deleteAll(url: string, json: any[]): Observable<any> {
    return this.http.post<any>(`${this.uri}/${url}`, json, httpOptions);
  }


  getPostulacion (usuario_id:string): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.uri2 +'?usuario_id='+usuario_id)
  }
}
