import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Plan } from '../models/planes';
import { Usuario } from '../models/usuario.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpBearer ={
  headers:new HttpHeaders({ 'Content-Type': 'application/json','Authorization': "Bearer t6pDUpNiA6ZzAG3AqQF8g8R6D6lVl_VVvnsY7wiokC6OAEGeNXxGnSPbXHZq2W0sj1gAumd5tpSjmPpcQamwe4I5DoYIcs78RHKnPs721jlmqNb3JryBmcuvysW5KOIqd_SZIWKO_ccX8arZEuQbhUR2KhncdMts0lYCayq9q2fxCTYg9urUlLvK2h34IsB0zEYa88RDAWQdKSrLuxtHc8j0oho0kb8zjlTdUbBa9M3DbB0LFt_d4h8p4mGkMF1phhDh_msDfNFg__6f52GyHkcyk4G396TGjynA1uWY-eQKfWd0YQ6dFC03Ffz4LwHDAaTQ5A"})
 }

@Injectable({
  providedIn: 'root'
})
export class PlanesService {



  public notificacion = new EventEmitter<any>();
  private opcionesUrl =  environment.base_url + '/planes';  // URL to web api

  private opcionesUrl1 =  environment.base_url + '/planes/todos';
 // private opcionesUrl2 =  environment.base_url + '/usuarios/plan';  // URL to web api
  private opcionesUrl3 =  environment.base_url + '/planes/pago';  // URL to web api

  private Url = "https://pay.payphonetodoesposible.com/api/button/Prepare"
  private UrlPago = " https://pay.payphonetodoesposible.com/api/button/V2/Confirm"
  constructor(private http: HttpClient) { }




  addPlan (proveedor: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.opcionesUrl, proveedor, httpOptions);
  }

  addPlanPago (proveedor: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.opcionesUrl3, proveedor, httpOptions);
  }


  getPlanesTodos(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.opcionesUrl1)
  }
  getPlan (usuario_id:string): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  }

  updatePlan (proveedor: Plan): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }

  pagar(data: any): Observable<any> {

    return this.http.post(this.Url, data, httpBearer);
  }

  getPago(data:any): Observable<any>{

    return this.http.post(this.UrlPago,data, httpBearer);

  }

}
