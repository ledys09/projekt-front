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
import { PlansComponent } from './admin-area/plans/plans/plans.component';
import { TemplatesAdminComponent } from './admin-area/templates-admin/templates-admin/templates-admin.component';
import { UsersComponent } from './admin-area/users/users/users.component';
import { EnterprisesAdminComponent } from './admin-area/enterprises-admin/enterprises-admin/enterprises-admin.component';
import { EditarPageComponent } from './enterprise-area/editar-page/editar-page/editar-page.component';


const routes: Routes = [
    { path: '',
    component: PagesComponent,
    canActivate: [ LoginGuard],
    children: [
      // enterprise-area
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Inicio'} },
      { path: 'files', component: FilesComponent, data: { titulo: 'Archivos'} },
      { path: 'pages', component: PagesEComponent, data: { titulo: 'Paginas'} },
      { path: 'categories', component: CategoriesComponent, data: { titulo: 'Categorias'} },
      { path: 'products', component: ProductsComponent, data: { titulo: 'Productos'} },
      { path: 'templates', component: TemplatesComponent, data: { titulo: 'Plantillas'} },
      { path: 'setting', component: SettingComponent, data: { titulo: 'Configuración'} },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil'} },
      { path: 'edit', component: EditarPageComponent, data: { titulo: 'Editar'} },
      // admin-area
      { path: 'admin-plan', component: PlansComponent, data: { titulo: 'Planes de pago'} },
      { path: 'admin-template', component: TemplatesAdminComponent, data: { titulo: 'Plantillas'} },
      { path: 'admin-user', component: UsersComponent, data: { titulo: 'Usuarios'} },
      { path: 'admin-enterprise', component: EnterprisesAdminComponent, data: { titulo: 'Empresas'} },

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


