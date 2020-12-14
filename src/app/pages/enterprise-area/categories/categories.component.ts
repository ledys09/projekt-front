import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria/categoria/categoria.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  cargando = true;
  categorias: Categoria[] = [];
  totalCategorias = 0;
  categoria: Categoria;

  constructor(public _usuarioService: UsuarioService,
              public _modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  buscarCategoria(termino: string){
    console.log(termino);
  }

  cargarCategorias(){
    this.cargando = false;
      this._usuarioService.cargarCategorias()
      .subscribe((resp: any) => {
        this.categorias = resp.data;
        this.totalCategorias = this.categorias.length;
        this.cargando = false;
      })
  }

  modalNuevaCategoria(modal){
    this._modalService.open(modal);
  }

  crearCategoria(categoria: Categoria){
    this._usuarioService.crearCategorias(categoria)
    .subscribe ( (resp: any) => {
      swal('Nueva categoria', resp.msg, 'success');
      this.cargarCategorias();
      this._modalService.dismissAll();
    })
  }

  modalEditarCategoria(categoria, modal){
    this.categoria = categoria;
    this._modalService.open(modal);
  }
  editarCategoria( categoria: Categoria){
    //console.log(this.categoria._id);
    this._usuarioService.actualizarCategorias(categoria, this.categoria._id)
    .subscribe ( (resp: any) => {
      swal(resp.msg, resp.categoriaDB.nombreCategoria, 'success');
      this.cargarCategorias();
      this._modalService.dismissAll();
    })
  }

  eliminarCategoria(categoria: Categoria){
    swal({
      title: '¿Está seguro?',
      text: 'Una vez eliminado, no puedes recuperarlo!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.eliminarCategoria(categoria._id)
    .subscribe((resp: any) => {
      this.cargarCategorias();
      swal(`${ resp.msg}`, { icon: 'success',});
      this.cargarCategorias();
        });
        this.cargarCategorias();
      }
    });
  }


}
