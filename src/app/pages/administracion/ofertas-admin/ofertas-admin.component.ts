import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';
import { OfertaService } from 'src/app/services/oferta.service';

@Component({
  selector: 'app-ofertas-admin',
  templateUrl: './ofertas-admin.component.html',
  styleUrls: ['./ofertas-admin.component.css']
})
export class OfertasAdminComponent implements OnInit {

  usuario: Usuario;
  cargando = false;
  
  formularios: Ofertas[];
  ofertaModelo = new Ofertas();
  totalRegistros: number = 1;
  constructor(private listainforme: OfertaService) { }

  ngOnInit(): void {

    this.getFormulariosOfertas()
  }




  getFormulariosOfertas() {


    this.listainforme.getOpciones().subscribe(
      result => {
        this.formularios = result
        console.log(this.formularios)
      });



  }


  buscarOferta(termino: string) {

    if (termino.length <= 0) {
      this.getFormulariosOfertas()
      return;
    }

    this.cargando = true;

    this.listainforme.buscarOfertas(termino)
      .subscribe((ofertas: Ofertas[]) => {

        this.formularios = ofertas

        console.log(this.formularios, 'oe')
        this.cargando = false;
      });

  }

}

