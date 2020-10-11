import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FilesComponent } from './files/files.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';


const pagesRoutes: Routes = [
    { path: 'pages',
    component: PagesComponent,
    children: [
      { path: 'progress', component: ProgressComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'files', component: FilesComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'dashboard'}
    ]
  },
];

/* export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
 */

@NgModule({
    imports: [RouterModule.forRoot(pagesRoutes)],
    exports: [RouterModule]
  })
  export class PAGES_ROUTES { }
