import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  img: any;

  constructor( public _serviceService: UsuarioService) { 
    this.usuario = _serviceService.usuario;

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
    this._serviceService.actualizarUsuario(this.usuario)
    .subscribe( data => {
      console.log(data);
    })
  }
}
