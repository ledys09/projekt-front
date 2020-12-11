import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pagina } from '../../../../models/page.model';
import { Bloque } from '../../../../models/bloque.model';

@Component({
  selector: 'app-editar-page',
  templateUrl: './editar-page.component.html',
  styleUrls: ['./editar-page.component.css']
})
export class EditarPageComponent implements OnInit {

 bloques: Bloque[]; 
@Input()  pagina:  Pagina
@Input() volver = true;
@Output() mostrar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  cambiardelHijo(){
    this.volver = false
    this.mostrar.emit(this.volver)
  }

}
