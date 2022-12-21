import { PipesModule } from './../../shared/pipes/pipes.module';
import { ApplicantProfileRoutingModule } from './applicant-profile-routing.module';
import { ApplicantProfileComponent } from './applicant-profile.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { AddApplicantComponent } from './pages/add-applicant/add-applicant.component';
import { ApplicantListComponent } from './pages/applicant-list/applicant-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApplicantDetailComponent } from './pages/applicant-detail/applicant-detail.component';

@NgModule({
  declarations: [
    AddApplicantComponent,
    ApplicantProfileComponent,
    ApplicantListComponent,
    ApplicantDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PipesModule,
    NgxPaginationModule,
    ApplicantProfileRoutingModule
  ],
  exports: [
    SharedModule,
    ApplicantProfileRoutingModule
  ],

  bootstrap: [ApplicantProfileComponent]
})
export class ApplicantProfileModule { }
