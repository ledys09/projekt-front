import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { AboutComponent } from './about/about.component';
import { RegisterClientComponent } from './register/client/register-client.component';
import { RegisterEnterpriseComponent } from './register/enterprise/register-enterprise.component';
import { PagenofoundComponent } from './shared/pagenofound/pagenofound.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register/enterprise', component: RegisterEnterpriseComponent },
  { path: 'register/client', component: RegisterClientComponent },
  { path: 'login', component: LoginComponent },
  { path: 'enterprises', component: EnterprisesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PagenofoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
