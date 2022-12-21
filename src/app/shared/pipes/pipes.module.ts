import { UserSearchPipe } from './user-search.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePicturePipe } from './profilePicture.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProfilePicturePipe,
    UserSearchPipe
  ],
  exports: [
    ProfilePicturePipe,
    UserSearchPipe
  ]
})
export class PipesModule { }
