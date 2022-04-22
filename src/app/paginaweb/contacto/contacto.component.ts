import { Component, OnInit } from '@angular/core';
import {  Validators, FormControl } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  loading = false;
  buttionText = "Submit";

  //Expresiones Regulares
  emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  textPattern = new RegExp(/^[a-zA-Z ]+$/);

  constructor( public _MessageService: MessageService) {
  }
    nombre = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(this.textPattern)]);
    email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
    asunto = new FormControl('',[Validators.required, Validators.minLength(4)]);
    mensaje = new FormControl('', [Validators.minLength(4)]);

  ngOnInit() {
  }

  onSubmit(){
    let user = {
      name: this.nombre.value,
      email: this.email.value,
      asunto: this.asunto.value,
      mensaje: this.mensaje.value
    }
    this._MessageService.sendEmail(environment.base_url + "/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} se a enviado el mensaje correctamente`
        );

      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Enviar";
      },() => {
        this.loading = false;
        this.buttionText = "Enviar";
      }
    );

    this.resetear();
  }

  resetear(){
    this.nombre.reset()
    this.email.reset()
    this.asunto.reset()
    this.mensaje.reset()
  }

}
