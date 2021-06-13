import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchR'
})
export class SearchRPipe implements PipeTransform {

  transform(users: any, searchR: any): any {
    if(searchR == undefined){
      return users;
    }else{
      return users.filter( user=>{
        return user.role.toLowerCase().includes(searchR.toLowerCase())
      })
    }
  }

}
