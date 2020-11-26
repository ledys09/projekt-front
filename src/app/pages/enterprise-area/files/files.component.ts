import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Archivo } from '../../../models/update/update.model';
import { URL_SERVICES } from '../../../config/config';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {

  archivoM: Archivo;
  archivos: Archivo[] = [];
  icon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMwpErTIwT-givt8HoMeQ-1eTjCj6moXQNRg&usqp=CAU';
  cargando = true;
  seccion = 'Imágenes';
  totalArchivos = 0;
  tipoArchivo = 'image';
  imgSubir: File;
  imgTemp: any;
  URL = URL_SERVICES;
  nombreDividido: string


  constructor(public _modalService: NgbModal,
              public _usuarioService: UsuarioService) {
               }

  ngOnInit(): void {
    this.cargarArchivos(this.tipoArchivo);
  }

  cargarArchivos(tipo: string){
    this.tipoArchivo = tipo;
    if(tipo === 'others'){
      this.seccion = 'Otros';
    }
    if(tipo === 'image'){
      this.seccion = 'Imágenes';
    }
    if(tipo === 'video'){
      this.seccion = 'Videos';
    }
    this._usuarioService.obtenerArchivos(this.tipoArchivo)
    .subscribe( (resp: any ) => {
      this.archivos = resp.fileDB;
      this.totalArchivos = resp.total;
      this.cargando= false;
    });
  }

  modalNuevoArchivo(modal){
    console.log('nuevo');
    this._modalService.open(modal);
  }
  guardarNuevoArchivo(){
    //console.log(archivo);
    this._usuarioService.nuevoArchivo(this.imgSubir);
    this._modalService.dismissAll();
    //console.log(this.tipoArchivo)
    this.cargarArchivos(this.tipoArchivo);
    this.imgTemp= null;
  }
  modalEditarArchivo(archivo: Archivo, modal){
   
    this.archivoM = archivo;
    this.archivos.forEach(el => {
      if(el._id === archivo._id){
        const nombreA = el.nombreArchivo.split('.');
        this.nombreDividido = nombreA[0];
        this.archivoM = el;
        this._modalService.open(modal,
          {
            size: 'lg',
            centered: true
          });
      }
    });
  }

  actualizarArchivo(archivo: Archivo){
    console.log('actualizar', archivo);
    this._usuarioService.actualizarArchivo(archivo, this.archivoM._id)
    .subscribe ((archivodb: any) => {
      swal(archivodb.msg, archivodb.fileDB.nombreArchivo, 'success' );
      this.cargarArchivos(this.tipoArchivo);
    });
    this._modalService.dismissAll();
   //this.imgTemp= null;
  }

  eliminarArchivo(archivo: Archivo){
    swal({
      title: '¿Está seguro?',
      text: 'Una vez eliminado, no puedes recuperarlo!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.eliminarArchivo(archivo)
    .subscribe((archivo: any) => {
      swal(`${ archivo.msg}`, {
        icon: 'success',
      });
      this.cargarArchivos(this.tipoArchivo);
    });
      }
    });
  }

  seleccionImg(archivo: File){
    if (!archivo){
      //this.imgTemp = null;
      this.imgSubir = null;
      return;
    }
  /* 
    if ( archivo.type.indexOf('image') < 0 ){
    swal ('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
    this.imgTemp = null;
    return;
  } */
    this.imgSubir = archivo;
    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imgTemp = reader.result;
  }

  buscarArchivo(termino: string){
    if( termino.length <= 0){
      this.cargarArchivos(this.tipoArchivo);
      return;
    }
    this.cargando = true;
    this._usuarioService.buscar('upload', termino)
    .subscribe((archivos: Archivo[]) => {
      this.archivos = archivos;
      this.cargando = false;
    })
  }

}
