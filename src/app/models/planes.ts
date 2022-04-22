import { Usuario } from "./usuario.model";

export class Plan {
    _id: string;
    tipoPlan: string;
    valor:string;
    usuario:Usuario;
    fecha1:Date
    fecha2:string
    //==========PLAN 1 ===========//
    amount: string;
    clientTransactionId:string;
    optionalParameter1: string;
    optionalParameter2: string;
    reference: string;
}