import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private joyride: JoyrideService) { }

  ngOnInit(): void {
  }


  home(){
    this.joyride.startTour(
      { steps: ['uno'],
      customTexts: {
        next: 'SIGUIENTE',
        prev: 'ANTERIOR',
        done: 'CERRAR'
      }, themeColor: '#56c2c6',
      stepDefaultPosition: 'center',
    }
    )
  }


}
