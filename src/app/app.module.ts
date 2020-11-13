import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//   Modulos
import { PagesModule } from './pages/pages.module';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { AboutComponent } from './about/about.component';
import { RegisterClientComponent } from './register/client/register-client.component';
import { RegisterEnterpriseComponent } from './register/enterprise/register-enterprise.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PagesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
