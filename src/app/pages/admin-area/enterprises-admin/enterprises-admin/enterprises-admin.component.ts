import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Usuario } from '../../../../models/usuario/usuario.model';
import swal from 'sweetalert'
import { Pagina } from '../../../../models/page.model';
import { Bloque } from '../../../../models/bloque.model';

@Component({
  selector: 'app-enterprises-admin',
  templateUrl: './enterprises-admin.component.html',
  styleUrls: ['./enterprises-admin.component.css']
})
export class EnterprisesAdminComponent implements OnInit {
  empresa: Usuario;
  empresas: Usuario[];
  bloques: Bloque[];
  paginas: Pagina[];
  pagina: Pagina;
  mostrarSitio = false;
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

  visitar(empresa: Usuario){
    // console.log(empresa);
    this.empresa = empresa
    this._usuarioService.cargarSitio(empresa._id)
    .subscribe( (resp: any) => {
      this.paginas = resp.data;
      this.paginas.forEach((element, i )=> {
        if(i === 0){
          this.bloques = element.bloques
        }
      });
    })
    this.mostrarSitio = true;
  }

  paginaInfo(pagina: Pagina){
    this.bloques= pagina.bloques
  }

  volver(){
    this.mostrarSitio = false;
    this.bloques = []
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
