import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert'

declare function init_plugins();

@Component({
  selector: 'app-register-enterprise',
  templateUrl: './register-enterprise.component.html',
  styleUrls: ['./register-enterprise.component.css']
})
export class RegisterEnterpriseComponent implements OnInit {
  forma: FormGroup;

  // tslint:disable-next-line: variable-name
  constructor(public _usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit(): void {
   init_plugins();
   this.forma = new FormGroup ({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, Validators.required),
      contrasena: new FormControl(null, [ Validators.required, Validators.minLength(8)]),
      telefono: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      nombreEmpresa: new FormControl(null, Validators.required),
      plan: new FormControl(null, Validators.required)
    });
  }

  // tslint:disable-next-line: typedef
  registrarEmpresa(){
    if (this.forma.invalid){
      swal('Datos incompletos', 'Debes llenar todos los datos', 'error');
      return;
    }
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.contrasena,
      this.forma.value.telefono,
      this.forma.value.direccion,
      this.forma.value.nombreEmpresa,
      this.forma.value.plan
    );
    this._usuarioService.crearUsuarioEmpresa( usuario)
    .subscribe(resp => {
      this.router.navigate(['/login']);
    });
  }

}
