import { Usuario } from "./usuario.model";

export class Postulacion {
    
    _id: String;
    postulacion: string;
    usuario:Usuario;
    ofertante:string;
    estado:string ="POSTULADO";
    emailOfertante:string
    urlPdf:string;
    telefono: string
    nombre:string

    tituloEmpleo:string
    remuneracion:string
    salario:string
   
    horario:string
    categoria:string
    ciudad:string
    telefonoEmpleador:string
}









