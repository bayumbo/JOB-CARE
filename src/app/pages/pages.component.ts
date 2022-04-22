import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear();
  public linkTheme = document.querySelector('#theme');

  constructor( setting:SettingsService) {
  //  customInitFunctions();
   }

  ngOnInit(): void {

   // customInitFunctions();

    const url = localStorage.getItem('theme') || './assets/css/colors/megna.css';
    //const url = `./assets/css/colors/${theme}.css`;

   this.linkTheme.setAttribute('href', url);
  //  href="./assets/css/colors/default-dark.css"
  }

}
