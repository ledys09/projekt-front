import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Archivo } from '../../../models/update.model';
import { URL_SERVICES } from '../../../config/config';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {

  archivos: Archivo;
  icon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMwpErTIwT-givt8HoMeQ-1eTjCj6moXQNRg&usqp=CAU';
  cargando = true;
  seccion = 'Imágenes';
  totalArchivos = 0;
  tipoArchivo = 'image';
  imgSubir: File;
  imgTemp: any;
  URL = URL_SERVICES;


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
    this.cargarArchivos(this.tipoArchivo);
    this.imgTemp= null;
  }
  modalEditarArchivo(archivo: Archivo, modal){
    console.log(archivo)
  }

  eliminarArchivo(archivo: Archivo){
    console.log(archivo);
  }

  seleccionImg(archivo: File){
    if (!archivo){
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


}
