import { Component, OnInit } from '@angular/core';
import { CursosComprados } from 'src/app/models/cursosComprados';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosCompradosCompradosService } from 'src/app/services/cursos-comprados.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cursos-generales-comprados',
  templateUrl: './cursos-generales-comprados.component.html',
  styleUrls: ['./cursos-generales-comprados.component.css']
})
export class CursosGeneralesCompradosComponent implements OnInit {

  usuario: Usuario;

  formularios: CursosComprados[];
  ofertaModelo= new CursosComprados();
  totalRegistros: number = 1;

  constructor(private _usuarioService: UsuarioService, private listainforme: CursosCompradosCompradosService) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit(): void {

    this.getFormulariosCursos()
  }



  getFormulariosCursos() {

    const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.listainforme.getCursosid(usuario._id).subscribe(
      result => {
         this.formularios =  result

       //  localStorage.setItem("Hojavida",JSON.stringify(this.formularios) )
         console.log(this.formularios)
     });
    }
}

