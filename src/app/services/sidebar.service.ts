import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Mi sitio web',
      submenu: [
        { titulo: 'Paginas', url: '/pages'},
        { titulo: 'Archivos', url: '/files'},
        { titulo: 'Categorias', url: '/categories'},
        { titulo: 'Productos', url: '/products'}
      ]
    },
  ];

  constructor() { }
}
