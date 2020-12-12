import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Pagina } from '../../../models/page.model';
import { Bloque } from '../../../models/bloque.model';

@Component({
  selector: 'app-oficialsite',
  templateUrl: './oficialsite.component.html',
  styleUrls: ['./oficialsite.component.css']
})
export class OficialsiteComponent implements OnInit {
paginas: Pagina[];
bloques: Bloque[];


  constructor(public _usuarioServicio: UsuarioService) { 
    this.cargarSitio()
  }

  ngOnInit(): void {
  }

  cargarSitio(){
    this._usuarioServicio.obtenerPaginas()
    .subscribe( (resp: any) => {
      this.paginas = resp.data;
      this.paginas.forEach((element, i )=> {
        if(i === 0){
          this.bloques = element.bloques
        }
      });
  
    })
  }

  paginaInfo(pagina: Pagina){
    this.bloques= pagina.bloques
    //console.log(pagina)
  }

}
