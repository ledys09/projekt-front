import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ){

    // tslint:disable-next-line: no-shadowed-variable
    return  new Promise ( ( resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('archivoSubir', archivo, archivo.name);
      xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){

        if(xhr.status === 200){
          console.log('iamgen subida');
          resolve(JSON.parse(xhr.response));
        }else {
          console.log('falló');
          reject(xhr.response);
        }
      }
      };
      const URL = URL_SERVICES + '/api/upload/img-perfil/' + tipo + '/' + id;
      console.log(URL)

      xhr.open('PUT', URL, true);
      xhr.send(formData);

    });
  }
}
