import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Urlinicio(){
    window.location.href="#/inicio"; 
    window.scrollTo(0, 0)
    location.reload()
  }

  Urlhome(){
    window.location.href="#/home"; 
    window.scrollTo(0, 0)
    location.reload()
  }

  Urlhome2(){
    window.location.href="#/home2"; 
    window.scrollTo(0, 0)
    location.reload()
  }

  Urlcursos(){
    window.location.href="#/cursos";
    window.scrollTo(0, 0);
    location.reload()
  }

  UrlContacto(){
    window.location.href="#/contacto";
    window.scrollTo(0, 0);
    location.reload()
  }

}
