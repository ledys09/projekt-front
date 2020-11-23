import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomSeguroPipe implements PipeTransform {

  constructor( private domSan: DomSanitizer) { }

  transform(url: string): any {
    return this.domSan.bypassSecurityTrustResourceUrl( url );
  }

}

