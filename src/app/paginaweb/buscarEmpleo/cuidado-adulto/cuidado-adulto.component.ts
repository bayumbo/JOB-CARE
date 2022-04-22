
import { Component,  OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VerificacionService } from 'src/app/services/verificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'app-cuidado-adulto',
  templateUrl: './cuidado-adulto.component.html',
  styleUrls: ['./cuidado-adulto.component.css']
})
export class CuidadoAdultoComponent implements OnInit {


  msg;
  validarEamil;
  Error;
  email: any;



  cate = 'CUIDADO ADULTO MAYOR';
  rol = 'EMPLEADO_ROLE';



  UsuarioModelo = new Usuario();

  //=================================

    //Expresiones Regulares
    emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


  onSubmit() {
    return false;
  }

  // formulario de registro //
  public formSubmitted = false;

  public registerForm = this.fb.group({
 /*    usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]], */
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required]],
  //  //clave: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(4)]],




    facebook: false,
    twitter: false,
    instagram: false,
    linkedin: false,



  })








  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private joyride: JoyrideService,
    private verificar: VerificacionService, private usuarioService: UsuarioService, private router: Router,
  ) {
    this.email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
    // this.to = new FormControl('', [Validators.required]);

  }

  ngOnInit(): void {

  }

      //mensaje guia ================================//
      cuidados(){
        this.joyride.startTour(
          { steps: ['primer'],
          customTexts: {
            next: 'SIGUIENTE',
            prev: 'ANTERIOR',
            done: 'CERRAR'
          }, themeColor: '#56c2c6',
          stepDefaultPosition: 'center',
        }
        )
      }
  //==================================================================//
  private url = environment.base_url;

  verificarEmail() {

    setTimeout(() => {
      this.verificar.sendEmail(this.url +'/codigo').subscribe(

        res => {

          this.msg = res['msg'];
          console.log(this.msg)
        }


      );

    }, 3000);

  };
  RevisandoEmail() {
    this.formSubmitted = true;
    this.spinner.show();
    let to = this.registerForm.value.email;
    console.log(to)
    this.verificar.Email(this.url+'/send', this.registerForm.value).subscribe(


      data => {
        this.spinner.hide();
        this.validarEamil = data['data'];
        console.log(data)


        if (this.validarEamil == "sent") {

          Swal.fire("Email enviado a " + to, "Se envío correo electrónico con su clave  Por favor revise la bandeja de entrada o spam!", "success")
          console.log('verifico')
        }

      });



    this.verificarEmail()
  }


  verificando() {
    if (this.registerForm.value.clave != this.msg) {
      Swal.fire('Clave', 'Invalida revise su email o verifique nuevamente!', 'error');
      console.log('Error de clave')

      //  document.getElementById("habilitarBoton").style.display ="inline";
    } else {

      Swal.fire("Codigo verificado con  exito", "", "success")
      console.log('funciona la verificacion')
      this.crearUsuario();
    }
  }

  crearUsuario() {
    this.formSubmitted = true;


    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      return;
    }
      console.log(this.registerForm.value)

      this.registerForm.value.categorias = this.cate;
      this.registerForm.value.role = this.rol;
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
        resp => {

          Swal.fire("Registro  existoso", "", "success")
          console.log(resp);
          this.router.navigateByUrl('/login')
        }, (err) => {
          // Si sucede un error
          //  Swal.fire('Error', err['msg'], 'error' );
          Swal.fire('Error', err.error.msg, 'error');

          //this.router.navigateByUrl('/inicio')
        }

      )
    //  this.resetUsuario()


  }


  resetUsuario() {
    this.registerForm.reset()
  }

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {

      return true
    } else {

      return false;
    }
  }


}
