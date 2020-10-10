import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EnterprisesComponent } from './pages/enterprises/enterprises.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterClientComponent } from './pages/register/register-client.component';
import { RegisterEnterpriseComponent } from './pages/register/register-enterprise.component';

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
