
import { Usuario } from './usuario.model';
export class Hojavida {
      _id : string;
      nombre: String;
      apellido: String;
      cedula: String;
      refSalarial: string;
      fechaNacimiento: Date;
      edad: String;
      img2: string
      genero:string;
      ocupacion: string;
      descripcion: string;
      categorias: string;
      provincia:string;
      ciudad: string;
      direccion: string;
      direccionMapa: string;
      experiencia:string;
      descripcionExperiencia: string;
      nivelEducacion: string;
      estado: string;
      rating: string;
      usuario:Usuario;
      check: boolean;
      user: Usuario;

      telefonohoja:string;
      //referencia1
      nombreRef1:string;
      cargoRef1: string;
      empresaRef1:string;
      telefonoRef1:string;
           //referencia2
           nombreRef2:string;
           cargoRef2: string;
           empresaRef2:string;
           telefonoRef2:string;
                //referencia3
      nombreRef3:string;
      cargoRef3: string;
      empresaRef3:string;
      telefonoRef3:string;

      postulacion:Array<Object>
      urlPdf:string
      tipoplan:string
      emailHoja:string

      cambioCiudad:string
      dispoViaje:string
      idioma:string
      nivelIdioma:string

      estatus: string
      comentario:string
}
