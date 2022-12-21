import { ApplicantProfileModule } from './features/applicant-profile/applicant-profile.module';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthComponent } from './features/auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
   { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
