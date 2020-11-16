import { NgModule } from '@angular/core';



import { PagesRoutingModule } from './pages.routes';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProgressComponent } from './progress/progress.component';
import { FilesComponent } from './enterprise-area/files/files.component';
import { PagesEComponent } from './enterprise-area/pages-e/pages-e.component';
import { CategoriesComponent } from './enterprise-area/categories/categories.component';
import { ProductsComponent } from './enterprise-area/products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { TemplatesComponent } from './enterprise-area/templates/templates.component';
import { SettingComponent } from './enterprise-area/setting/setting.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
  //  ProgressComponent,
    FilesComponent,
    PagesEComponent,
    CategoriesComponent,
    ProductsComponent,
    ProfileComponent,
    TemplatesComponent,
    SettingComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
  //  ProgressComponent,
    FilesComponent,
  ],
  imports: [
    SharedModule,
    PagesRoutingModule,
    CommonModule,
    PipesModule
  ]
})
export class PagesModule { }
