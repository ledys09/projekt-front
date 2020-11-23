import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import swal from 'sweetalert';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuarioM: Usuario;
  role = 'admin_role';
  usuarios: Usuario[] = [];
  totalUsuarios = 0;
  desde =  0;
  cargando = true;
  imgSubir: File;
  imgTemp: any;

  constructor( public _usuarioService: UsuarioService,
               private _modalService: NgbModal) { }
  ngOnInit(): void {

    this.cargarUsuarios(this.role, this.desde);
  }

  cargarUsuarios(role: string, desde: number = 0){
    this.desde = desde;
    this.role = role;
    this._usuarioService.cargarUsuarios(role, desde)
    .subscribe( (resp: any) => {
      this.totalUsuarios = resp.total;
      this.usuarios = resp.data;
      this.cargando = false;
    });
  }

  cambiarDesde( valor: number){
    this.role = this.role;
    const desde = this.desde + valor;
    if (desde >= this.totalUsuarios ){
      return;
    }
    if (desde < 0 ){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios(this.role, this.desde);
  }

  buscarUsuario (termino: string){
    if( termino.length <= 0){
      this.cargarUsuarios(this.role, this.desde)
      return;
    }
    // console.log(termino);
    this._usuarioService.buscarUsuario(termino)
    .subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
    })
  }

  eliminarUsuario(usuario: Usuario){
    if ( usuario._id === this._usuarioService.id){
      swal(
        'No puede eliminar este usuario',
        'No se puede eliminar usted mismo',
        'error');
      return;
    }
    this._usuarioService.eliminarUsuario(usuario)
    .subscribe((usuario: any) => {
      swal(
        'Usuario eliminado',
        `${usuario.nombre}`,
        'success');
      return;
    });
    this.cargarUsuarios(this.role, this.desde);
    // console.log(usuario._id);
  }

  modalNuevoUsuario(modal){
    this._modalService.open(modal,
      {
        size: 'lg',
        centered: true
      });
}

guardarNuevoUsuario(usuario: Usuario){
  if (this.role === 'admin_role'){
  //  console.log(usuario)
    this._usuarioService.crearUsuarioAdmin(usuario)
    .subscribe( (resp: any) => {
      swal(
        'Usuario administrado registrado',
        `${usuario.nombre}`,
        'success');
      this.cargarUsuarios(this.role, this.desde);
      return;
    });
    this._modalService.dismissAll();

  }

  if (this.role === 'enterprise_role'){
    this._usuarioService.crearUsuarioEmpresa(usuario)
    .subscribe( (resp: any) => {
      swal(
        'Usuario empresa registrado',
        `${usuario.nombreEmpresa}`,
        'success');
      this.cargarUsuarios(this.role, this.desde);
      return;
    });
    this._modalService.dismissAll();
  }

  if (this.role === 'client_role'){
    this._usuarioService.crearUsuarioCliente(usuario)
    .subscribe( (resp: any) => {
      swal(
        'Usuario cliente registrado',
        `${usuario.nombre}`,
        'success');
      this.cargarUsuarios(this.role, this.desde);
      return;
    });
    this._modalService.dismissAll();
  }

}

modalEditarUsuario(usuario: Usuario, modal){
  this.usuarios.forEach(el => {
    if(el._id === usuario._id){
      // console.log(el);
      this.usuarioM = el;
      this._modalService.open(modal,
        {
          size: 'lg',
          centered: true
        });
    }
  });
}

actualizarUsuario(usuario: Usuario){
  this._usuarioService.actualizarUsuarioAdmin(usuario, this.usuarioM._id)
  .subscribe( (usuario: any) => {
    swal(
      'Usuario actualizado',
      `${usuario.UsuarioDB.nombre}`,
      'success');
    this.cargarUsuarios(this.role, this.desde);
    return;
  });
  this._modalService.dismissAll();
}

seleccionImg(archivo: File){
  if (!archivo){
    this.imgSubir = null;
    return;
  }

  if ( archivo.type.indexOf('image') < 0 ){
  swal ('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
  this.imgTemp = null;
  return;
}
  this.imgSubir = archivo;
  let reader = new FileReader();
  let urlImgTemp = reader.readAsDataURL(archivo);
  reader.onloadend = () => this.imgTemp = reader.result;
}

cambiarImg(){
this._usuarioService.cambiarImgAdmin(this.imgSubir, this.usuarioM._id, this.usuarioM.role);
this._modalService.dismissAll();
this.cargarUsuarios(this.role, this.desde);
this.imgTemp= null;
}

}