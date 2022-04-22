
import { environment } from '../../environments/environment';

const base_url = environment.base_url;


export class Usuario {

    _id: string;


    email: string;
    password:string;
    telefono?: string;
    clave?: String;
    img?: string
    role?: string
    provincia?:string;
    ciudad?:string;
    direccion?:string;
    direccionmapa?: string;
    lavado?: boolean;
    comida?: boolean;
    limpieza?: boolean;
    tareas?: boolean;
    fecha?: Date;
    ninos?: Array<any>
    tipoPlan?: string;
    categorias?: string;
    adulto?:string;

    usuario?: string;
    compania?: boolean;
    alimentacion?: boolean;
    actividades?: boolean;
    paseo?: boolean;

    perros?: boolean;
    gatos?: boolean;
    otros?: boolean;


    peluqueria?: boolean;
    masajes?: boolean;
    manicure?: boolean;
    pedicura?: boolean;
    maquillaje?: boolean;


    bebe?:boolean;
    infante?:boolean;
    adolescente?:boolean;
    adultocheck?:boolean;
    adultoMayor?:boolean;
    descripcion?:string;

    prekinder?: boolean;

     kinder?: boolean;
     escuela?:boolean;
     colegio?:boolean;



     albanil?:boolean;

     electricista?:boolean;

     plomero?:boolean;

     carpintero?:boolean;

     cerrajero?:boolean;

     jardinero?:boolean;

     servicioTecnico?:boolean;



    grua?:boolean;

    mecanico?:boolean;
    electrico?:boolean;

    lavadoAuto?:boolean;

    chofer?:boolean;
    cerrajeroAutomotriz?:boolean;



    paqueteria?:boolean;
    tramites?:boolean;
    movilizacion?:boolean;

    dentroCiudad?:boolean;

    otrasCiudades?:boolean;

    fueraPais?:boolean;

    facebook?:boolean;
    twitter?:boolean;
    instagram?:boolean;
    linkedin?:boolean;

    get imagenUrl() {

        if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
    } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }
    }


}

