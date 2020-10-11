import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { AboutComponent } from './about/about.component';
import { RegisterClientComponent } from './register/client/register-client.component';
import { RegisterEnterpriseComponent } from './register/enterprise/register-enterprise.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FilesComponent } from './pages/files/files.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './shared/header/header.component';
import { PagenofoundComponent } from './shared/pagenofound/pagenofound.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EnterprisesComponent,
    AboutComponent,
    RegisterClientComponent,
    RegisterEnterpriseComponent,
    FooterComponent,
    NavbarComponent,
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    FilesComponent,
    PagenofoundComponent,
HeaderComponent,
SidebarComponent,
BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
