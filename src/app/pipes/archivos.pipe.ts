import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'archivos'
})
export class ArchivosPipe implements PipeTransform {

  transform(id: string, archivo: string = 'images'): any {
    let url = URL_SERVICES + `/api/upload/get/${id}/${archivo}`;
    return url;
  }
}

