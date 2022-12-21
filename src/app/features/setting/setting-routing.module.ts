import { CountryComponent } from './pages/country/country.component';
import { SettingComponent } from './setting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './pages/job/job.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: 'job',
        component: JobComponent,
        data: { breadcrumb: 'Job' }

      },
      {
        path: 'country',
        component: CountryComponent,
        data: { breadcrumb: 'Country' }

      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
