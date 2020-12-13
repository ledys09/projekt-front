import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Usuario } from '../../../../models/usuario/usuario.model';
import swal from 'sweetalert'

@Component({
  selector: 'app-enterprises-admin',
  templateUrl: './enterprises-admin.component.html',
  styleUrls: ['./enterprises-admin.component.css']
})
export class EnterprisesAdminComponent implements OnInit {

  empresas: Usuario[];

  constructor(public _usuarioService: UsuarioService) { 
    this.cargarEmpresas()
  }

  ngOnInit(): void {
  }

  cargarEmpresas(){
    this._usuarioService.cargarEmpresas()
    .subscribe((resp: any) => {
      this.empresas = resp.data;
    })
  }

  eliminarEmpresa(empresa: Usuario){
    swal({
      title: '¿Está seguro?',
      text: 'Una vez eliminado, no puedes recuperarlo!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.eliminarUsuario(empresa)
    .subscribe((usuario: any) => {
      swal(`${ usuario.nombreEmpresa} Eliminado con exito`, {
        icon: 'success',
      });
      this.cargarEmpresas();
    });
      }
    });
  }

}
