import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioEmail } from '../models/usuarioEmail';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {

  constructor(private _http: HttpClient) { }

  sendEmail(url) {
    return this._http.get(url);
  }

  Email(url, data:UsuarioEmail) {
    return this._http.post(url, data);
  }
}