import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Plan } from '../models/plan.model';

declare function init_plugins();


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  planes: Plan[];
  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.cargarPlanes()
  }

  cargarPlanes(){
    this._usuarioService.obtenerPlan()
    .subscribe( (resp: any) => {
      this.planes = resp.data
    })
  }

}
