import { Hojavida } from './hojavida';
import { Ofertas } from './ofertas';
import { Usuario } from "./usuario.model";


export class Calificacion {

    _id : string;
    title: string;
    detalle: string;
    view: boolean;
    fechaReporte: string;
    uri: string;
    trasmitter: Usuario
    receiver: Usuario
    receiverHoja:Hojavida
    receiverOferta: Ofertas
    usuario: Usuario
    urlPdfHoja: string
    emailOfertante:string

    nombreEmpleado: string
    telefonohoja: string
    emailHoja: string
    telefonoEmpleador:string


}
