import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { Cursos } from 'src/app/models/cursos';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { DragdropService } from 'src/app/services/dragdrop.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-editar-cursos',
  templateUrl: './editar-cursos.component.html',
  styleUrls: ['./editar-cursos.component.css']
})
export class EditarCursosComponent implements OnInit {

  opcionesGenerales: Categoria[]
  ofertaModelo= new Cursos();



  urlPDF: string;

  fileArr = [];
  imgArr = [];
  fileObj = [];

  msg: string;
  progress: number = 0;






 public registerForm = this.fb.group({
   tituloCurso: ['', [Validators.required]],
   descripcionCurso: ['', [Validators.required]],

   valor: ['', [Validators.required]],


   estado:[''],
   categorias:[''],
   avatar: [null],
   urlPdf: [''],
    //   provincia: ['', [Validators.required]],
 //  ciudad: ['', [Validators.required]],
 //  direccionmapa: ['', [Validators.required]],
 //  lavado: ['',],
 //  comida: ['',],
 //  limpieza: ['',],
 //  tareas: ['',],
 //  fecha: ['', [Validators.required]],






 })



 constructor( private fb: FormBuilder, private sanitizer: DomSanitizer, public dragdropService: DragdropService,
   private opcionesServices : CategoriasService,private location: Location,private route: ActivatedRoute,
    private cursos : CursosService) {

    }

 ngOnInit(): void {


  const id = this.route.snapshot.paramMap.get('id');
  this.cursos.getCursosId(id)
    .subscribe(resp => this.ofertaModelo = resp);

  this.getOpciones1()
 }

//metodo  categorias
//opciones generales
getOpciones1() {
 return this.opcionesServices.getOpciones()
   .subscribe(
     opcionesGenerales => {
       console.log(opcionesGenerales);
       this.opcionesGenerales = opcionesGenerales
     }
   );
}




update(): void {
  //this.submitted = true;
  this.ofertaModelo.urlPdf = this.urlPDF;
  this.cursos.updateCurso(this.ofertaModelo)
      .subscribe(result => {
        console.log(result)
        Swal.fire("Actualización de oferta existoso", "", "success")
      });
}

updateEstado(): void {
  //this.submitted = true;

  this.cursos.updateCurso(this.ofertaModelo)
      .subscribe(result => {
        console.log(result)
        Swal.fire("Actualización de Publicación existoso", "", "success")
      });
}

delete(): void {
//   this.submitted = true;
  this.cursos.deleteCurso(this.ofertaModelo._id)
      .subscribe(
        result => {


          console.log(result)
      });
      this.goBack()
}
goBack(): void {
  this.location.back();
}
atras(): void {
  this.location.back();
}

   //=======================subir archivos===========================//


   upload(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    })

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item)
    })

    // Set files form control
    this.registerForm.patchValue({
      avatar: this.fileObj
    })

    this.registerForm.get('avatar').updateValueAndValidity()

    // Upload to server
    this.registerForm.value.usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    this.dragdropService.addFiles(this.registerForm.value.avatar)


      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('Documento cargado exitosamente!', event.body);
            this.urlPDF = event.body.userCreated.avatar[0];
            console.log(this.urlPDF, 'aqui se inserto')
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = "Documento cargado exitosamente!"
            }, 3000);
        }
      })
  }

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}




