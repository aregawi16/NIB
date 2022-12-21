import { ApplicantDetailComponent } from './pages/applicant-detail/applicant-detail.component';
import { ApplicantProfileComponent } from './applicant-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddApplicantComponent } from './pages/add-applicant/add-applicant.component';
import { ApplicantListComponent } from './pages/applicant-list/applicant-list.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicantProfileComponent,
    children: [
      {
        path: 'create-new',
        component: AddApplicantComponent,
        data: { breadcrumb: 'Add' }
      },
      {
        path: 'list',
        component: ApplicantListComponent,
        data: { breadcrumb: 'List' }
      },
      {
        path: 'detail/:id',
        component: ApplicantDetailComponent,
        data: { breadcrumb: 'Detail' }
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantProfileRoutingModule { }
