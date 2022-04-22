import { Hojavida } from './hojavida';
import { Usuario } from "./usuario.model";

export class Ofertas {

 _id: string;
 tituloEmpleo: string;
 descripcionEmpleo: string;
 valor:number;
 horario:string;
 direccion:string;
 remuneracion: string;
 usuario:Usuario;
estado: String;
categorias: string;
provincia:  string;

tipoPlan:string;
ciudad: string;
postulacion?:Array<Object>
descripcion?:Hojavida;
user?: Usuario;
emailEmpleador:string;
telefonoEmpleador:string
estatus: string ="POSTULADO";
}
