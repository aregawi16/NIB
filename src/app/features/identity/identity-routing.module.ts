import { RoleComponent } from './pages/role/role.component';
import { UserComponent } from './pages/user/user.component';
import { IdentityComponent } from './identity.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IdentityComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: { breadcrumb: 'User' }

      },
      {
        path: 'role',
        component: RoleComponent,
        data: { breadcrumb: 'Role' }

      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
