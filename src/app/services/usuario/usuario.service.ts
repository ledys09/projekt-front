import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  tipo: string;
  menu: any = [];
  usuario: Usuario;
  token: string;
  role: string;
  id: string;
  

  constructor( public http: HttpClient,
               public router: Router,
               public _uploadService: UploadService ) {
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario, role: string, menu: any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('role', role);
    localStorage.setItem('menu', JSON.stringify(menu));
    this.menu = menu;
    this.usuario = usuario;
    this.token = token;
    this.role = role;
    this.id = id;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      this.role = localStorage.getItem('role');
      this.id = localStorage.getItem('id');
    }else{
      this.menu = null;
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
    this.menu = null;
    this.role = null;
    this.id = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
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
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + '/api/user/registeradmin';
    return this.http.post(URL, usuario, {headers});
  }

  actualizarUsuario(usuario: Usuario){
  const headers = new HttpHeaders ({
    'token': this.token
  });
  const URL = URL_SERVICES + `/api/user/${this.id}`;
  return this.http.put(URL, usuario, {headers})
  .pipe(map((resp: any) => {
    // this.usuario = resp.usuario;
    this.guardarStorage(this.id, this.token, resp.UsuarioDB, this.role, resp.menu);
    swal('Usuario actualizado', usuario.nombre, 'success' );
    return true;
  }));
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
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp. role, resp.menu);
      
      return true;
    }));
  }

  cambiarImg( archivo: File, id: string){
   
    if (this.role === 'admin_role'){
      this.tipo = 'admin';
    }
    if(this.role === 'client_role'){
      this.tipo = 'client';
    }
    if(this.role === 'enterprise_role'){
      this.tipo = 'enterprise';
    }
    this._uploadService.subirArchivo(archivo, this.tipo, id)
    .then((resp: any) => {
    this.usuario.foto = resp.data.foto;
    swal('Imagen actualizada', this.usuario.nombre, 'success');
    this.guardarStorage(id, this.token, this.usuario, this.role, resp.menu);
    })
    .catch(resp => {

    });
  }

  cargarUsuarios(role: string, desde: number = 0){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/user/users/${role}?desde=${desde}`;
    return this.http.get(URL, {headers});
  }

  buscarUsuario( termino: string){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/user/search/${termino}`;
    return this.http.get(URL, {headers})
    .pipe(map ((resp: any) => resp.data ) );
  }


  eliminarUsuario(usuario: Usuario){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/user/${usuario._id}`;
    return this.http.delete(URL, {headers})
    .pipe(map( (usuario: any) => usuario.UsuarioDB) );
  }

  actualizarUsuarioAdmin(usuario: Usuario, id: string){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/user/${id}`;
    return this.http.put(URL, usuario, {headers});
    }

    cambiarImgAdmin( archivo: File, id: string, role: string){
   
      if (role === 'admin_role'){
        this.tipo = 'admin';
      }
      if(role === 'client_role'){
        this.tipo = 'client';
      }
      if( role === 'enterprise_role'){
        this.tipo = 'enterprise';
      }
      this._uploadService.subirArchivo(archivo, this.tipo, id)
      .then((resp: any) => {
      this.usuario.foto = resp.data.foto;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      })
      .catch(resp => {
        swal('No se puedo actualizar', resp, 'success');
      });
    }
  
  obtenerUsuario(id: string){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/user/${id}`;
    return this.http.get(URL, {headers})
    .pipe(map ((data: any) => data.usuarioDB ) );
  }


}



