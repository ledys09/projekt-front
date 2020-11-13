import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recordar: boolean = false;
  correo: string;
  constructor( public router: Router,
               // tslint:disable-next-line: variable-name
               public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.correo = localStorage.getItem('correo') || '';
    if (this.correo.length > 1 ){
    this.recordar = true;
    }
  }

  // tslint:disable-next-line: typedef
  ingresar(forma: NgForm){
    if (forma.invalid){
      return;
    }
    const usuario = new Usuario (null, forma.value.correo, forma.value.contrasena);
    this._usuarioService.login(usuario, forma.value.recordar)
    .subscribe( estado => this.router.navigate(['/dashboard'] ));
  }
}
