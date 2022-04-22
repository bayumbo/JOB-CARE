import { OfertaService } from '../../../services/oferta.service';
import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/models/ofertas';
import { Usuario } from 'src/app/models/usuario.model';






@Component({
  selector: 'app-ver-ofertas',
  templateUrl: './ver-ofertas.component.html',
  styleUrls: ['./ver-ofertas.component.css']
})
export class VerOfertasComponent implements OnInit {


 formularios: Ofertas[];
 totalRegistros: number = 1;
  
 constructor( private listainforme: OfertaService) { }
 
 
 ngOnInit() {
     
  this.getFormulariosOfertas();
 
  }

      getFormulariosOfertas() {

      const usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      this.listainforme.getOfertas(usuario._id).subscribe(
        result => { 
           this.formularios =  result;
           },error =>{
       console.log(error,'Error')
      //  Swal.fire( error.error.msg.sumary, error.error.msg.detail, 'error');
      });
}
}