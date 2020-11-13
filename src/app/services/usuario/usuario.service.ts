import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('servicio usuario');
  }

  crearUsuarioCliente(usuario: Usuario){
  const URL = URL_SERVICES + '/api/user/registerclient';
  return this.http.post(URL, usuario)
  .pipe(map( (resp: any) => {
    swal('Usuario creado', usuario.nombre, 'success');
    return resp.usuario;
  }));
  }

  crearUsuarioEmpresa(usuario: Usuario){
    const URL = URL_SERVICES + '/api/user/registerenterprise';
    return this.http.post(URL, usuario);
  }

  crearUsuarioAdmin(usuario: Usuario){
    const URL = URL_SERVICES + '/api/user/registeradmin';
    return this.http.post(URL, usuario);
  }

  login(usuario: Usuario, recordar: boolean = false){

    if (recordar){
      localStorage.setItem('correo', usuario.correo);
    }else{
      localStorage.removeItem('correo');
    }

    const URL = URL_SERVICES + '/api/login';
    return this.http.post(URL, usuario)
    .pipe(map((resp: any) => {
      localStorage.setItem('id', resp.id);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('usuario', resp.usuario);
      localStorage.setItem('role', resp.role);
      return true;
    }));
  }
}

