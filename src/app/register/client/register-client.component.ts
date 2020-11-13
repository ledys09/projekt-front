import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

// import * as swal from 'sweetalert';

// tslint:disable-next-line: typedef
declare function init_plugins();

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {
  forma: FormGroup;
  // tslint:disable-next-line: variable-name
  constructor(public _usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit(): void {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      telefono: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
    });
  }
  // tslint:disable-next-line: typedef
  registrarCliente(){
    if (this.forma.invalid){
    swal('Fail!', 'Debes llenar los campos!', 'warning');
    return;
    }
    const usuario = new Usuario (
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.contrasena,
      this.forma.value.telefono,
      this.forma.value.direccion,
      );
    this._usuarioService.crearUsuarioCliente( usuario )
      .subscribe( data => {
       this.router.navigate(['/login']);
      });
   // console.log(this.forma.value);
  }

}
