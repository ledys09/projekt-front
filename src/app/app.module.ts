import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EnterprisesComponent } from './pages/enterprises/enterprises.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { RegisterClientComponent } from './pages/register/register-client.component';
import { RegisterEnterpriseComponent } from './pages/register/register-enterprise.component';
import { NavColorDirective } from './directives/nav-color.directive';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { InicioComponent } from './models/enterprise/inicio/inicio.component';
import { PagesComponent } from './models/enterprise/pages/pages.component';
import { FilesComponent } from './models/enterprise/files/files.component';
import { CategoriesComponent } from './models/enterprise/categories/categories.component';
import { ProductsComponent } from './models/enterprise/products/products.component';
import { SettingComponent } from './models/enterprise/setting/setting.component';
import { TemplatesComponent } from './models/enterprise/templates/templates.component';
import { ShoppingComponent } from './models/client/shopping/shopping.component';
import { ShopcartComponent } from './models/client/shopcart/shopcart.component';
import { UsermanageComponent } from './models/admin/usermanage/usermanage.component';
import { PlanmanageComponent } from './models/admin/planmanage/planmanage.component';
import { TemplatemanageComponent } from './models/admin/templatemanage/templatemanage.component';

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
    InicioComponent,
    PagesComponent,
    FilesComponent,
    CategoriesComponent,
    ProductsComponent,
    SettingComponent,
    TemplatesComponent,
    ShoppingComponent,
    ShopcartComponent,
    UsermanageComponent,
    PlanmanageComponent,
    TemplatemanageComponent
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
