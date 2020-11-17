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
     /* /api/upload/img-perfil/client/5fb2e8389e8f644f0899c0e6 
     http://localhost:5000/api/upload/img-perfil/enterprise/5fac436f44e3cf8814d14f5b
     let tipo = '';
      const role = this._usuarioService.role;
      if(role === 'client_role'){
        tipo = 'client';
      }
      if(role === 'enterprise_role'){
        tipo = 'enterprise';
      }
      if(role === 'admin_role'){
        tipo = 'admin';
      } */

      xhr.open('PUT', URL, true);
      xhr.send(formData);

    });
  }
}
