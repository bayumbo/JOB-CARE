import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {

  constructor(private joyride: JoyrideService) { }

  ngOnInit(): void {
  }

  home2(){
    this.joyride.startTour(
      { steps: ['one'],
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
