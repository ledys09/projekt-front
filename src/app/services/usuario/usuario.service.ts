import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadService } from '../upload/upload.service';
import { Archivo } from '../../models/update/update.model';
import { Categoria } from '../../models/categoria/categoria/categoria.model';
import { Producto } from '../../models/product.model';
import { Pagina } from '../../models/page.model';
import { Bloque } from '../../models/bloque.model';

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
 // pagina: Pagina;
 pagina: Pagina = {
   _id: '1',
  titulo: 'x',
  descripcion: 'pagina descr x',
  bloques: []
}
  

  constructor( public http: HttpClient,
               public router: Router,
               public _uploadService: UploadService ) {
    this.cargarStorage();
  }

 

  guardarPaginaStorage(){
    localStorage.setItem('paginaEditar', JSON.stringify(this.pagina));
    console.log('guardado en el local')
  }

  cargarPaginaStorage(){
    if(localStorage.getItem('paginaEditar')){
      this.pagina = JSON.parse(localStorage.getItem('paginaEditar'));
      console.log('cargando de local');
    } else{
      console.log('usando valor por defecto')
    }
  }

  marcarPagina(pagina: Pagina){
    this.pagina = pagina
    console.log(this.pagina)
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
    if (localStorage.getItem('token')){
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
    if (this.role === 'client_role'){
      this.tipo = 'client';
    }
    if (this.role === 'enterprise_role'){
      this.tipo = 'enterprise';
    }
    this._uploadService.subirArchivo(archivo, this.tipo, id)
    .then((resp: any) => {
    this.usuario.foto = resp.data.foto;
    swal('Imagen actualizada', this.usuario.nombre, 'success');
    this.guardarStorage(id, this.token, this.usuario, this.role, resp.menu);
    })
    .catch(resp => {
      console.log(resp);
    });
  }

  cambiarImgProducto(archivo: File, idProducto: string){
      this._uploadService.subirProductoEmpresa(archivo, this.id, idProducto)
      .then((resp: any) => {
        swal('Imagen actualizada', resp.msg, 'success');
        })
        .catch(resp => {
          console.log('error', resp);
        });
  }

  cambiarImgAdmin( archivo: File, id: string, role: string){
    if (role === 'admin_role'){
      this.tipo = 'admin';
    }
    if (role === 'client_role'){
      this.tipo = 'client';
    }
    if ( role === 'enterprise_role'){
      this.tipo = 'enterprise';
    }
    this._uploadService.subirArchivo(archivo, this.tipo, id)
    .then((resp: any) => {
      swal('Imagen actualizada', resp.msg, 'success');
      if (id === this.id){
        const data = resp.data;
        this.guardarStorage(data._id, this.token, data, data.role, this.menu);
       // console.log(id, this.id)
      }
    })
    .catch(resp => {
      swal('No se puedo actualizar', resp.msg, 'success');
    });
    this.cargarStorage();
  }

  cargarUsuarios(role: string, desde: number = 0){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/user/users/${role}?desde=${desde}`;
    return this.http.get(URL, {headers});
  }

  buscar( coleccion: string, termino: string){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/${coleccion}/search/${termino}`;
    return this.http.get(URL, {headers})
    .pipe(map ((resp: any) => resp.data ) );
  }

  obtenerUsuario(id: string){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/user/${id}`;
    return this.http.get(URL, {headers})
    .pipe(map ((data: any) => data.usuarioDB ) );
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
  
    nuevoArchivo(archivo: File){
      this._uploadService.subirArchivoEmpresa(archivo, this.id)
      .then((resp: any) => {
        // this.usuario.foto = resp.data.foto;
        swal('Archivo subido', resp.msg, 'success');
        })
        .catch(resp => {
          console.log(resp)
          swal('No guardado', resp.msg, 'error');
        });
    }

    actualizarArchivo(archivo: Archivo, idArchivo: string){
      const headers = new HttpHeaders ({
        'token': this.token
      });
      const URL = URL_SERVICES + `/api/upload/${this.id}/${idArchivo}`;
      return this.http.put(URL, archivo, {headers});
    }

  obtenerArchivos(tipo: string){
    const URL = URL_SERVICES + `/api/upload/${this.id}/${tipo}`;
    return this.http.get(URL);
  }

  eliminarArchivo(archivo: Archivo){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/upload/${archivo._id}`;
    return this.http.delete(URL, {headers});
    // .pipe(map( (usuario: any) => usuario.UsuarioDB) );
  }

  cargarCategorias( ){
    const URL = URL_SERVICES + `/api/category/${this.id}`;
    return this.http.get(URL);
  }

  crearCategorias(categoria: Categoria){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/category`;
    return this.http.post(URL, categoria, {headers});
  }

  actualizarCategorias(categoria: Categoria, idCategoria: string){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/category/${idCategoria}`;
    return this.http.put(URL, categoria, {headers});

  }

  eliminarCategoria(idCategoria: string){
     const headers = new HttpHeaders ({
           'token': this.token
         });
     const URL = URL_SERVICES + `/api/category/${idCategoria}`;
     return this.http.delete(URL, {headers});
  }
  
  cargarProductos(idCategoria: string){
    const URL = URL_SERVICES + `/api/product/products/${idCategoria}`;
    return this.http.get(URL)
  }

  nuevoProducto(producto: Producto){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/product`;
    return this.http.post(URL, producto, {headers});
  }


  actualizarProducto(producto: Producto, idProducto: string){
    ///api/product/:id
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/product/${idProducto}`;
    return this.http.put(URL, producto, {headers});
  }

  eliminarProducto(idProducto: string){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/product/${idProducto}`;
    return this.http.delete(URL, {headers});
  }

  obtenerPaginas(){
    const URL = URL_SERVICES + `/api/page/${this.id}`;
    return this.http.get(URL);
  }

  nuevaPage(pagina: Pagina){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/page`;
    return this.http.post(URL, pagina, {headers});
  }

  eliminarPagina(idPagina: string){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/page/${idPagina}`;
    return this.http.delete(URL, {headers});
  }

  actualizarPagina(pagina: Pagina){
    const headers = new HttpHeaders ({
      'token': this.token
    });
    const URL = URL_SERVICES + `/api/page/${this.pagina._id}`;
    return this.http.put(URL, pagina, {headers});
  }

  crearBloque(bloque: Bloque, idPagina: string){
   // /api/page/bloque/:idPagina
   const URL = URL_SERVICES + `/api/page/bloque/${idPagina}`;
   return this.http.put(URL, bloque);
  }

  eliminarBloque(bloque: Bloque){
// }/api/page/bloque/delete/:idPagina/:idBloque
const URL = URL_SERVICES + `/api/page/bloque/delete/${this.pagina._id}/${bloque._id}`;
return this.http.put(URL, {});
  }

  actualizarBloque(bloque: Bloque, idBloque: string){
    //:idPagina/:idBloque
    const URL = URL_SERVICES + `/api/page/bloque/${this.pagina._id}/${idBloque}`;
    return this.http.put(URL, {bloque});
  }

  paginaSingle(){
      // /api/page/pages/5fd1c4ba5f33d7c72c908533 
      const URL = URL_SERVICES + `/api/page/pages/${this.pagina._id}`;
      return this.http.get(URL);
  }

}



