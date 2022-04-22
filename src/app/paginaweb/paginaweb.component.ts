import { Component, OnInit } from '@angular/core';
declare function customInitFunctions();
@Component({
  selector: 'app-paginaweb',
  templateUrl: './paginaweb.component.html',
  styleUrls: ['./paginaweb.component.css']
})
export class PaginawebComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    customInitFunctions();
  }

}
