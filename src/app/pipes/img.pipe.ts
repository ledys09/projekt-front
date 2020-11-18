import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(img: string, tipo: string = 'enterprise'): any {
    let url = URL_SERVICES + `/api/upload/perfil/`;
    if (!img){
      return url + 'nada';
    } 

    switch (tipo){
      case 'client':
        url += 'client/' + img;
        break;
        case 'enterprise':
          url += 'enterprise/' + img;
          break;
          case 'admin':
            url += 'admin/' + img;
            break;
            default:
              console.log('no existr');
              url += 'client/nada';
    }
    return url;
  }
}
