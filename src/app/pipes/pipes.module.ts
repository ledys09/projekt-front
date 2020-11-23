import { NgModule } from '@angular/core';
import { ImgPipe } from './img.pipe';
import { DomSeguroPipe } from './dom-seguro.pipe';
import { ArchivosPipe } from './archivos.pipe';



@NgModule({
  declarations: [
    ImgPipe,
    DomSeguroPipe,
    ArchivosPipe
  ],
  imports: [

  ],
  exports: [
    ImgPipe,
    DomSeguroPipe,
    ArchivosPipe
  ]
})
export class PipesModule { }
