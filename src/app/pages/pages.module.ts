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
import { SettingComponent } from './enterprise-area/setting/setting.component';
import { TemplatesComponent } from './enterprise-area/templates/templates.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { PlansComponent } from './admin-area/plans/plans/plans.component';
import { TemplatesAdminComponent } from './admin-area/templates-admin/templates-admin/templates-admin.component';
import { UsersComponent } from './admin-area/users/users/users.component';
import { EnterprisesAdminComponent } from './admin-area/enterprises-admin/enterprises-admin/enterprises-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarPageComponent } from './enterprise-area/editar-page/editar-page/editar-page.component';


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
    SettingComponent,
    PlansComponent,
    TemplatesAdminComponent,
    UsersComponent,
    EnterprisesAdminComponent,
    EditarPageComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
  //  ProgressComponent,
    FilesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    PipesModule,
    CKEditorModule,
    FormsModule,
    NgbModule
  ]
})
export class PagesModule { }
