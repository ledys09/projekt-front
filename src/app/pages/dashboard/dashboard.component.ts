import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  usuario: string; 
  rol: string;

  constructor(public _usuarioService: UsuarioService) { 
    this.userActivo()
  }
  ngOnInit(): void {
  }

  userActivo(){
    this.rol = this._usuarioService.role;
    if(this.rol === 'enterprise_role'){
      this.usuario = this._usuarioService.usuario.nombreEmpresa
    }else{
      this.usuario = this._usuarioService.usuario.nombre
    }
  }

}
