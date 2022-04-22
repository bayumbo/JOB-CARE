import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Login {

    constructor(

       // public email: string,
       public email: string,
        public password: string,

    //    public telefono: string,
    //    public _id: string,
    //    public clave: String,
    //    public img: string,
    //
//
//
    //    public provincia?: string,
    //    public ciudad?: string,
    //    public direccion?: string,
    //    public direccionmapa?: string,
    //    public lavado?: boolean,
    //    public comida?: boolean,
    //    public limpieza?: boolean,
    //    public tareas?: boolean,
    //    public fecha?: Date,
    //    public ninos?: Array<any>
        ){ }


   /*     get imagenUrl() {
                console.log(this.img)
            if ( this.img ) {
                return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }  */

}
