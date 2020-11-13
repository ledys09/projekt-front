import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FilesComponent } from './enterprise-area/files/files.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { PagesEComponent } from './enterprise-area/pages-e/pages-e.component';
import { CategoriesComponent } from './enterprise-area/categories/categories.component';
import { ProductsComponent } from './enterprise-area/products/products.component';
import { LoginGuard } from '../services/guards/login.guard';


const routes: Routes = [
    { path: '',
    component: PagesComponent,
    canActivate: [ LoginGuard],
    children: [
      { path: 'progress', component: ProgressComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'files', component: FilesComponent },
      { path: 'pages', component: PagesEComponent},
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent },
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


