

export interface RegisterForm {
    usuario: string,
    telefono: string,
    email: string,
    password:string,
    clave: string,
    provincia:string,
    ciudad:string,
    direccion:string,
    direccionmapa: string,
    lavado: boolean,
    comida: boolean,
    limpieza: boolean,
    tareas: boolean,
    fecha: Date
    //forarray
    ninos: Array<any>,
 
}
