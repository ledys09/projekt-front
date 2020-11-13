import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  // tslint:disable-next-line: typedef

  constructor( public _usuarioService: UsuarioService,
               public router: Router ){}
  canActivate(){
    if (this._usuarioService.logueoExists()){
      console.log('pasó el guard');
    }else{
      console.log('debes loguearte');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
