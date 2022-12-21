import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(user => {
        if (user.fullName) {
          return user.fullName.search(searchText) !== -1;
        }
        else{
          return user.fullName.search(searchText) !== -1;
        }
      });
    }
    else
    {
      return [];
    }
  }
}
