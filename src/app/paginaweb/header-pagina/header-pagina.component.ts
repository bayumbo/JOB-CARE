import { Component, Input, OnInit } from '@angular/core';

import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-header-pagina',
  templateUrl: './header-pagina.component.html',
  styleUrls: ['./header-pagina.component.css']
})
export class HeaderPaginaComponent implements OnInit {




  //pasos del formulario en una sola pantalla

  @Input() activeNav: boolean;
  @Input() servicioNav: boolean;
  @Input() experienciaNav: boolean;
  @Input() procesoNav: boolean;
  @Input() inicioNav: boolean;


  constructor(private joyride: JoyrideService) {
    this.activeNav = false;
    this.servicioNav = false;
    this.experienciaNav = false;
    this.procesoNav = false;
    this.inicioNav = false;
  }



  ngOnInit() {


  }

  tour() {
    this.joyride.startTour(
      {
        steps: ['1', '2', '3', '4', '5','6'],
        customTexts: {
          next: 'SIGUIENTE',
          prev: 'ANTERIOR',
          done: 'CERRAR'
        }, themeColor: '#56c2c6',
        stepDefaultPosition: 'center',
      }
    )
  }

  UrlInicio() {
    window.location.href = "#/inicio";
    //  window.scrollTo(0, 0)
    // location.reload()
    location.reload();
  }

  UrlLogingin() {
    window.location.href = "#/login";
    //  window.scrollTo(0, 0)
    // location.reload()
  //  location.reload();
  }

  UrlOfertas() {
    window.location.href = "#/ofertaEmpleo";
    //  window.scrollTo(0, 0)
    // location.reload()
    location.reload();
  }

  perfilEmpleados

  UrlPerfil() {
    window.location.href = "#/perfilEmpleados";
    window.scrollTo(0, 0)
    location.reload()
  }

  UrlServicio() { }



  presionar() {
    window.location.href = "#/nineraEmpleador";

    location.reload()
  }
  presionar1() {
    window.location.href = "#/cuidadoAdultoEmpleador";

    location.reload()
  }
  presionar2() {
    window.location.href = "#/domesticoEmpleador";
    // window.scrollTo(0, 600);

    location.reload()
  }

  presionar3() {
    window.location.href = "#/mascotaEmpleador";
    //  window.scrollTo(0, 600);

    location.reload()
  }

  presionar4() {
    window.location.href = "#/spaEmpleador";
    // window.scrollTo(0, 600);

    location.reload()
  }
  presionar5() {
    window.location.href = "#/capacidadesEmpleador";
    // window.scrollTo(0, 600);

    location.reload()
  }
  presionar6() {
    window.location.href = "#/tutoriasEmpleador";
    // window.scrollTo(0, 600);
    location.reload()
  }
  presionar7() {
    window.location.href = "#/trabajosEmpleador";
    //  window.scrollTo(0, 600);

    location.reload()
  }
  presionar8() {
    window.location.href = "#/asistenciaEmpleador";
    //  window.scrollTo(0, 600);

    location.reload()
  }
  presionar9() {
    window.location.href = "#/mensajeriaEmpleador";
    //  window.scrollTo(0, 600);

    location.reload()
  }
  presionar10() {
    window.location.href = "#/profesionalEmpleador";
    // window.scrollTo(0, 600);
    location.reload()
  }
  presionar11() {
    window.location.href = "#/cursos";
    // window.scrollTo(0, 600);
    location.reload()
  }
}
