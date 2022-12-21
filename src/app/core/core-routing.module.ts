
import { CoreComponent } from './core.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children:[
      { path: 'applicant-profile', loadChildren: () => import('./../features/applicant-profile/applicant-profile.module').then(m => m.ApplicantProfileModule), data: { breadcrumb: 'Applicant Profile' }},
      { path: 'setting', loadChildren: () => import('./../features/setting/setting.module').then(m => m.SettingModule), data: { breadcrumb: 'Setting' } },
      { path: 'identity', loadChildren: () => import('./../features/identity/identity.module').then(m => m.IdentityModule), data: { breadcrumb: 'Idenity' } },
      //{ path: 'applicant-profile', loadChildren: () => import('./../features/applicant-profile/applicant-profile.module').then(m => m.ApplicantProfileModule) },

    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),

],

  exports: [RouterModule]
})
export class CoreRoutingModule { }
