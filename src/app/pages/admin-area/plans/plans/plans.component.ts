import { Component, OnInit } from '@angular/core';
import { Plan } from '../../../../models/plan.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert'

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  planes: Plan[];
  plan: Plan;
  cargando = true;
  total = 0;

  constructor(public _usuarioService: UsuarioService,
              public _modalService: NgbModal,) { 
    this.cargarPlanes()
  }

  ngOnInit(): void {
  }

  cargarPlanes(){
    this._usuarioService.obtenerPlan()
    .subscribe( (resp: any) => {
      this.planes = resp.data;
      this.total = resp.total;
      this.cargando = false
    })
  }

  modalNuevoPlan(modal){
    this._modalService.open(modal, {size: 'lg'})
  }

  modalEditarPlan(modal, plan: Plan){
    this.plan = plan
    this._modalService.open(modal, {size: 'lg'})
  }

  crearPlan(plan: Plan){
    this._usuarioService.nuevoPlan(plan)
    .subscribe((resp: any) =>{
      swal('Exitoso', resp.msg, 'success');
      this._modalService.dismissAll()
      this.cargarPlanes();
    })
  }

  actualizarPlan(plan: Plan){
//console.log(plan)
    this._usuarioService.editarPlan(plan, this.plan._id)
    .subscribe( (resp: any) => {
      swal('Hecho', resp.msg, 'success');
      this._modalService.dismissAll()
      this.cargarPlanes();
    })

  }

  eliminarPlan(plan){
    swal({
      title: '¿Está seguro?',
      text: 'Una vez eliminado, no puedes recuperarlo!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.eliminarPlan(plan._id)
    .subscribe((resp: any) => {
      swal(`${ resp.msg}`, {
        icon: 'success',
      });
      this.cargarPlanes();
        });
      }
    });
  }

}
