import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EnterprisesComponent } from './components/enterprises/enterprises.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterClientComponent } from './components/register/register-client.component';
import { RegisterEnterpriseComponent } from './components/register/register-enterprise.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent,
          children: [
            { path: 'enterprise', component: RegisterEnterpriseComponent },
            { path: 'client', component: RegisterClientComponent },
            { path: '**', pathMatch: 'full', redirectTo: 'home' },
          ] },
  { path: 'login', component: LoginComponent },
  { path: 'enterprises', component: EnterprisesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home'},
  { path: ' ', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
