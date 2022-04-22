import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { RolesPipe } from './roles.pipe';


@NgModule({
  declarations: [
    ImagenPipe,
    RolesPipe,
 
  
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagenPipe,
    RolesPipe,
  ],
  providers: [
    
   
  ],
})
export class PipesModule { }
