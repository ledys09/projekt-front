import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Pagina } from '../../../models/page.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert'
import { Router } from '@angular/router';
import { Bloque } from '../../../models/bloque.model';

@Component({
  selector: 'app-pages-e',
  templateUrl: './pages-e.component.html',
  styleUrls: ['./pages-e.component.css']
})
export class PagesEComponent implements OnInit {
  @Output() pageMod = new EventEmitter<Pagina>();
  active = 1;
  cargando = true;
  editar = false;
  total = 0;
  paginas: Pagina[];
  pagina: Pagina;
  bloques: Bloque[];


  constructor(public _usuarioService: UsuarioService,
              public _modalService: NgbModal,
              public router: Router) { }

  ngOnInit(): void {
    this.obtenerPaginas();
  }
  ckeditorContent;


  enviarPage(pagina: Pagina){
    console.log(pagina)
    this.pagina = pagina;
    this.pageMod.emit(this.pagina)
    this.editar = true;
   // this.bloques = pagina.bloques;

    /* this.paginaE = 'pagina a enviar'
    this.bloques = this.pagina.bloques;
    this.pagina = pagina
    this.editar = true; */
    //this.router.navigate(['/dashboard']);
  }

  obtenerPaginas(){
    this._usuarioService.obtenerPaginas()
    .subscribe( (resp:any)=>{
      this.paginas = resp.data;
      this.total = resp.total;
      this.cargando = false;
    })
  }

  modalNuevaPagina(modal){
    this._modalService.open(modal, {size: 'lg'})
  }

  crearPagina(pagina){
    this._usuarioService.nuevaPage(pagina)
    .subscribe( (resp: any) =>{
      swal('Página Creada', pagina.titulo, 'success' );
      this.obtenerPaginas();
      this._modalService.dismissAll()
    })
  }

  eliminarPagina(pagina: Pagina){
      swal({
        title: '¿Está seguro?',
        text: 'Una vez eliminado, no puedes recuperarlo!',
        icon: 'warning',
        buttons: [true, true],
        dangerMode: true,
      })
      .then((borrar) => {
        if (borrar) {
          this._usuarioService.eliminarPagina(pagina._id)      
          .subscribe((resp: any) => {
        swal(`${ resp.msg}`, {
          icon: 'success',
        });
        this.obtenerPaginas();
          });
        }
      });
  }

  editarPaginaBloques(pagina: Pagina){
    console.log(pagina)
    this.pagina = pagina
    this.bloques = this.pagina.bloques;
    //this.router.navigate(['/dashboard']);
    this.editar = true;
  }
  
  editarPagina(pagina: Pagina){
   // console.log(pagina)
   this._usuarioService.actualizarPagina(pagina, this.pagina._id)
   .subscribe((resp: any) => {
   
   })
  }

  crearBloque(bloque: Bloque){
    console.log(bloque)
    this._usuarioService.crearBloque(bloque, this.pagina._id )
    .subscribe ( (resp: any) => {
      this.editar = false;
      console.log(resp);
    })
   
  }
  
  editarBloque(bloque: Bloque){
    console.log(bloque);

  }
   
  eliminarBloque(bloque: Bloque){
    console.log(bloque)
  }




}
