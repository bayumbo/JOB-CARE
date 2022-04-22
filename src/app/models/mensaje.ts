import { Ofertas } from './ofertas';
import { Usuario } from './usuario.model';



export class Mensaje {
  _id: string;
 oferta: Ofertas;
  usuario: Usuario;
  mensaje: string;
  tipoUsuario: string;
  fecha: string;
  estado: string;

  constructor() {
    this.estado = '';
  }

}
