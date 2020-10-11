import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { AboutComponent } from './about/about.component';
import { RegisterClientComponent } from './register/client/register-client.component';
import { RegisterEnterpriseComponent } from './register/enterprise/register-enterprise.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FilesComponent } from './pages/files/files.component';
import { PagenofoundComponent } from './shared/pagenofound/pagenofound.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'register/enterprise', component: RegisterEnterpriseComponent },
  { path: 'register/client', component: RegisterClientComponent },
  { path: 'login', component: LoginComponent },
  { path: 'enterprises', component: EnterprisesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: PagesComponent,
    children: [
      { path: 'progress', component: ProgressComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'files', component: FilesComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'dashboard'},
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'}
    ]},
  { path: '**', component: PagenofoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
