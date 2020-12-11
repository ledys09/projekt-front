import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pagina } from '../../../../models/page.model';
import { Bloque } from '../../../../models/bloque.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

@Component({
  selector: 'app-editar-page',
  templateUrl: './editar-page.component.html',
  styleUrls: ['./editar-page.component.css']
})
export class EditarPageComponent implements OnInit {
  mostrarBM = false;
active = 1;
 bloques: Bloque[]; 
 pagina: Pagina;
 bloqueM: Bloque;
//@Input()  pagina:  Pagina
//@Input() volver = false;
//@Output() mostrar = new EventEmitter<boolean>();

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this._usuarioService.cargarPaginaStorage()
    this.cargarPaginaBloques()
  }
  ckeditorContent;

  /* cambiardelHijo(){
    this.volver = false
    this.mostrar.emit(this.volver)
  } */

  cargarPaginaBloques(){
    this.pagina= this._usuarioService.pagina;
   // this.pagina = this._usuarioService.pagina;
    this._usuarioService.paginaSingle()
    .subscribe( (resp: any) => {
      this.pagina = resp.data;
      this.bloques = this.pagina.bloques
    })
  }

  editarPagina(pagina: Pagina){
    // console.log(pagina)
    this._usuarioService.actualizarPagina(pagina)
    .subscribe((resp: any) => {
      console.log(resp.msg);
      this.cargarPaginaBloques()
    })
   }

   crearBloque(bloque: Bloque){
    console.log(bloque)
    this._usuarioService.crearBloque(bloque, this.pagina._id )
    .subscribe ( (resp: any) => {
      console.log(resp);
      this.cargarPaginaBloques()
    })
   
  }
  
  editarBloque(bloque: Bloque){
    this.bloqueM = bloque;
    this.active = 2;
    this.mostrarBM = true;
    console.log(bloque);
  }

  actualizandoBloque(bloque: Bloque){
    console.log(bloque, this.bloqueM._id);
    this._usuarioService.actualizarBloque(bloque, this.bloqueM._id)
    .subscribe( (resp: any) => {
      console.log(resp.msg);
      this.cargarPaginaBloques()
    })
   //
  }
   
  eliminarBloque(bloque: Bloque){
    this._usuarioService.eliminarBloque(bloque)
    .subscribe( (resp: any) => {
      console.log(resp.msg)
      this.cargarPaginaBloques()
    })
  }


}
