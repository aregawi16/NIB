import { ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from './../../shared/directives/disabled-form.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { JobComponent } from './pages/job/job.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CountryComponent } from './pages/country/country.component';


@NgModule({
  declarations: [
    SettingComponent,
    DisableControlDirective,
    JobComponent,
    CountryComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class SettingModule { }
