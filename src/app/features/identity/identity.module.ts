import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { UserComponent } from './pages/user/user.component';
import { RoleComponent } from './pages/role/role.component';


@NgModule({
  declarations: [
    UserComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule
  ]
})
export class IdentityModule { }
