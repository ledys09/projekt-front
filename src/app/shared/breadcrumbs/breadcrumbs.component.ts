import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
               private title: Title,
               public _usuarioService: UsuarioService) {
      this.getDataRoute()
    .subscribe ( data => {
      if(data.titulo === 'Inicio'){
        if(this._usuarioService.role === 'enterprise_role'){
          this.titulo = `¡ Hola ${this._usuarioService.usuario.nombreEmpresa} !`
          this.title.setTitle(this.titulo);
        }else{
          this.titulo = `¡ Hola ${this._usuarioService.usuario.nombre} !`
          this.title.setTitle(this.titulo);
        }
      }else{
        this.titulo = data.titulo;
        this.title.setTitle(this.titulo);
      }
    });
   }

  ngOnInit(): void {
  }

  getDataRoute(){
    return  this.router.events.pipe(

      filter(event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd ) => event.snapshot.data)
    );
  }

}
