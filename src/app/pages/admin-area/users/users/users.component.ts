import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  role = 'admin_role';
  usuarios: Usuario[] = [];
  totalUsuarios = 0;
  cargando = true;

  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios(this.role);
  }

  cargarUsuarios(role: string = 'admin_role'){
    this._usuarioService.cargarUsuarios(role)
    .subscribe( (resp: any) => {
      this.totalUsuarios = resp.total;
      this.usuarios = resp.data;
      this.cargando = false;
    });
  }

  buscarUsuario (termino: string){
    console.log(termino);
  }

}
