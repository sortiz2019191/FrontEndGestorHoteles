import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchH'
})
export class SearchHPipe implements PipeTransform {



  transform(hotels: any, searchH: any,): any {
    if(searchH == undefined){
      return hotels;
    }else{
      return hotels.filter( hotel=>{
        return hotel.name.toLowerCase().includes(searchH.toLowerCase())
      })
    }
  }
}
