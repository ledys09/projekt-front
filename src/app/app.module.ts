import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { RegisterClientComponent } from './register/client/register-client.component';
import { RegisterEnterpriseComponent } from './register/enterprise/register-enterprise.component';
import { NavColorDirective } from './directives/nav-color.directive';
import { FooterComponent } from './shared/footer/footer.component';
import { PagenofoundComponent } from './shared/pagenofound/pagenofound.component';
import { DashboardComponent} from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { FilesComponent } from './pages/files/files.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EnterprisesComponent,
    AboutComponent,
    RegisterClientComponent,
    RegisterEnterpriseComponent,
    NavColorDirective,
    FooterComponent,
    PagenofoundComponent,
    DashboardComponent,
    ProgressComponent,
    FilesComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
