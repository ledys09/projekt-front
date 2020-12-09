import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Categoria } from '../../../models/categoria/categoria/categoria.model';
import { Producto } from '../../../models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categorias: Categoria[]  = [];
  productos: Producto[]  = [];
  categoriaSeleccionada: Categoria;
  producto: Producto;
  cargando = true;
  imgSubir: File;
  imgTemp: any;


  constructor(public _usuarioService: UsuarioService,
              public _modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarCat()
  }

  cargarCat(){
    this._usuarioService.cargarCategorias()
    .subscribe( (resp: any) => {
     // console.log(resp.data[0])
      this.categorias = resp.data;
      this.categoriaSeleccionada = resp.data[0]
      this.cargarProducts()
    })
  }

  cargarProducts(){
    console.log(this.categoriaSeleccionada)
    this._usuarioService.cargarProductos(this.categoriaSeleccionada._id)
    .subscribe (( resp: any) => {
    this.productos = resp.data;
    this.cargando = false;
    console.log(this.productos)
    })
  }


  crearProducto(pr){
    this.producto = pr;
    this.producto.categoria = this.categoriaSeleccionada._id
    console.log(this.producto)
    this._usuarioService.nuevoProducto(this.producto)
    .subscribe ( (resp: any) => {
      swal('Nueva producto', resp.msg, 'success');
      this.cargarProducts();
      this._modalService.dismissAll();
    })
  }

  modalCrearProducto(modal){
    console.log(this.categoriaSeleccionada)
    this._modalService.open(modal, {size: 'lg'})
  }

  modalEditarProducto(producto, modal){
    this.producto = producto
    this._modalService.open(modal, {size: 'lg'})
    console.log(this.producto)

  }

  seleccionImg(archivo: File){
    if (!archivo){
      this.imgSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ){
    swal ('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
    this.imgTemp = null;
    return;
  }
    this.imgSubir = archivo;
    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imgTemp = reader.result;
  }

  cambiarImg(){
    this._usuarioService.cambiarImgProducto(this.imgSubir, this.producto._id);
    console.log(this.categoriaSeleccionada)
    this.cargarProducts()
    this._modalService.dismissAll();
    this.imgTemp= null;
    this.imgSubir = null;
    }

  editarProducto(producto: Producto){
  this._usuarioService.actualizarProducto(producto, this.producto._id)
  .subscribe ( (resp: any) => {
    swal(resp.msg, resp.productoDB.nombreProducto, 'success');
    this.cargarProducts();
    this._modalService.dismissAll();
  })
  }

  eliminarProducto(producto: Producto){
    console.log(producto)
    swal({
      title: '¿Está seguro?',
      text: 'Una vez eliminado, no puedes recuperarlo!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.eliminarProducto(producto._id)
    .subscribe((resp: any) => {
      swal(`${ resp.msg}`, {
        icon: 'success',
      });
      this.cargarProducts();
        });
      }
    });
  }

}
