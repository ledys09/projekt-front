import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  tipoUser: string;

  constructor(public _sidebarService: SidebarService,
              public _usuarioService: UsuarioService) { }
  

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this._sidebarService.cargarMenu();
    this.cargarTipo();
  }

  cargarTipo(){
    const tipo = this._usuarioService.role;
    if ( tipo === 'client_role'){
      return this.tipoUser = 'client';
    }
    if ( tipo === 'admin_role'){
      return this.tipoUser = 'admin';
    }
    if ( tipo === 'enteprise_role'){
      return this.tipoUser = 'enterprise';
    }
  }

}
