import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EnterprisesComponent } from './components/enterprises/enterprises.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { RegisterClientComponent } from './components/register/register-client.component';
import { RegisterEnterpriseComponent } from './components/register/register-enterprise.component';
import { NavColorDirective } from './directives/nav-color.directive';
import { FooterComponent } from './components/shared/footer/footer.component';
import { InicioComponent } from './components/modules/enterprise/inicio/inicio.component';
import { PagesComponent } from './components/modules/enterprise/pages/pages.component';
import { FilesComponent } from './components/modules/enterprise/files/files.component';
import { CategoriesComponent } from './components/modules/enterprise/categories/categories.component';
import { ProductsComponent } from './components/modules/enterprise/products/products.component';
import { SettingComponent } from './components/modules/enterprise/setting/setting.component';
import { TemplatesComponent } from './components/modules/enterprise/templates/templates.component';
import { ShoppingComponent } from './components/modules/client/shopping/shopping.component';
import { ShopcartComponent } from './components/modules/client/shopcart/shopcart.component';
import { UsermanageComponent } from './components/modules/admin/usermanage/usermanage.component';
import { PlanmanageComponent } from './components/modules/admin/planmanage/planmanage.component';
import { TemplatemanageComponent } from './components/modules/admin/templatemanage/templatemanage.component';

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
