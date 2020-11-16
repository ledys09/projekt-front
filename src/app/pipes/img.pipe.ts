import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(img: string, ...args: unknown[]): unknown {
   
    const url = URL_SERVICES + `/api/upload/perfil/`;
    if (!img){
      return url + 'nada';
    } else {
    return url + img;
    }
  }

}
