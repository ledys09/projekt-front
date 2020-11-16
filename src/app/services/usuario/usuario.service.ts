import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  usuario: Usuario;
  token: string;
  role: string;
  id: string;

  constructor( public http: HttpClient,
               public router: Router ) {
    console.log('servicio usuario');
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario, role: string){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('role', role);
    this.usuario = usuario;
    this.token = token;
    this.role = role;
    this.id = id;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.role = localStorage.getItem('role');
      this.id = localStorage.getItem('id');
    }else{
      this.token = '';
      this.usuario = null;
      this.role = null;
      this.id = null;
  }
    }

  logueoExists(){
    return (this.token !== '') ? true : false;
  }

  logout(){
    this.token = '';
    this.usuario = null;
    this.role = null;
    this.id = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
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
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp. role);
      return true;
    }));
  }
  
}

