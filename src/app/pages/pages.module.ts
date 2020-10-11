import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { FilesComponent } from './files/files.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    FilesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    FilesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class PagesModule { }
