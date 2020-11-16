import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FilesComponent } from './enterprise-area/files/files.component';
//  import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { PagesEComponent } from './enterprise-area/pages-e/pages-e.component';
import { CategoriesComponent } from './enterprise-area/categories/categories.component';
import { ProductsComponent } from './enterprise-area/products/products.component';
import { LoginGuard } from '../services/guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { TemplatesComponent } from './enterprise-area/templates/templates.component';
import { SettingComponent } from './enterprise-area/setting/setting.component';


const routes: Routes = [
    { path: '',
    component: PagesComponent,
    canActivate: [ LoginGuard],
    children: [
  //    { path: 'progress', component: ProgressComponent },
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Inicio'} },
      { path: 'files', component: FilesComponent, data: { titulo: 'Archivos'} },
      { path: 'pages', component: PagesEComponent, data: { titulo: 'Paginas'} },
      { path: 'categories', component: CategoriesComponent, data: { titulo: 'Categorias'} },
      { path: 'products', component: ProductsComponent, data: { titulo: 'Productos'} },
      { path: 'templates', component: TemplatesComponent, data: { titulo: 'Temas'} },
      { path: 'setting', component: SettingComponent, data: { titulo: 'Configuración'} },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil'} },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard'}
    ]
  }
];

/* export const PAGES_ROUTES = RouterModule.forChild( routes);
 */

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }


