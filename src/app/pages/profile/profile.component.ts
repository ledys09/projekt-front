import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imgSubir: File;
  imgTemp: any;

  constructor( public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  actualizar(usuario: Usuario){
    console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    this.usuario.nombreEmpresa = usuario.nombreEmpresa;
    this.usuario.telefono = usuario.telefono;
    this.usuario.correo = usuario.correo;
    this.usuario.direccion = usuario.direccion;
    this.usuario.plan = usuario.plan;
    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe( data => {
      console.log(data);
    });
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
  this._usuarioService.cambiarImg(this.imgSubir, this._usuarioService.id);
  }
}
