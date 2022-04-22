import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';





import { Usuario } from '../models/usuario.model';
import { Login } from '../models/login';
import Swal from 'sweetalert2';
import { SubirArchivoService } from './subir-archivo.service';

const base_url = environment.base_url;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private opcionesUrl2 =  environment.base_url + '/usuarios/registro/user';
  userLogin: Login;
  usuario: Usuario;

  token: string;
  menu: any[] = [];

  public auth2: any;
id
  constructor( private http: HttpClient,
    private _subirArchivoService: SubirArchivoService,
                private router: Router,
                private ngZone: NgZone ) {

                  this.cargarStorage();

     this.id = localStorage.getItem('id');
  }



  estaLogueado() {
    return ( localStorage.getItem('token') ) ? true : false;
  }


  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
     // this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }




  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('rating');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('itempages');
    localStorage.removeItem('menu');
    this.router.navigate(['/inicio']);

  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }


  crearUsuario( formData: Usuario ) {

    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              )

  }

  login( usuario: Login, recuerdame: boolean = false ) {
    if ( !recuerdame ) {
      localStorage.setItem('email', usuario.email);

    } else {
      localStorage.removeItem('email');
    }

    let url = `${ environment.base_url }/login`;

    return this.http.post( url, usuario ).pipe(map((resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
      console.log(resp)
      return true;
    }));
  }





  cambiarImagen( archivo: File, _id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', _id )
          .then( (resp: any) => {

            this.usuario.img = resp.usuario.img;
            Swal.fire( 'Imagen Actualizada', this.usuario.usuario, 'success' );
            this.guardarStorage( _id, this.token, this.usuario, this.menu );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  actualizarUsuario( usuario: Usuario ) {
    let url = `${ environment.base_url }/usuarios/${ usuario._id }`;

    return this.http.put(url, usuario).pipe(map((resp: any) => {

      if ( usuario._id === this.usuario._id ) {
        let usuarioDB = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB,this.menu);
      }
      Swal.fire('Usuario actualizado', usuario.usuario, 'success' );
      console.log(resp)
      return resp;

    }));
  }


  actualizarPerfil( data:Usuario, ) {



    return this.http.put(`${ base_url }/usuarios/${ this.id }`, data, );

  }

  cargarUsuarios1( desde: number = 0 ) {

    let url = environment.base_url+ '/usuarios?desde=' + desde;
    return this.http.get( url );

  }

  cargarUsuarios() {
    let url = `${ environment.base_url }/usuario `;

    return this.http.get( url ).pipe(map((resp: any) => resp));
  }

  buscarUsuarios( termino: string ) {
    let url = `${ environment.base_url }/busqueda/coleccion/usuarios/${ termino }`;

    return this.http.get( url ).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario( id: string ) {
    let url = `${ environment.base_url }/usuarios/${ id }?token=${ this.token }`;

    return this.http.delete( url ).pipe(map((resp: any) => resp.usuario));
  }



  //Actualizaci[on de registro

  getusuarioId(id: string): Observable<Usuario> {
    const url = `${environment.base_url}/usuarios/${id}`;
    return this.http.get<Usuario>(url);
  }

  updateOpcion (proveedor: Usuario): Observable<any> {

  //  let url = `${ environment.base_url }/usuarios/registro`;
    return this.http.put(this.opcionesUrl2, proveedor, httpOptions);
  }
}
