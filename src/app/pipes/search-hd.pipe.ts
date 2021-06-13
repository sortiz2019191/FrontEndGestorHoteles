import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHD'
})
export class SearchHDPipe implements PipeTransform {

  transform(hotels: any, searchHD: any): any {
    if(searchHD == undefined){
      return hotels;
    }else{
      return hotels.filter( hotel=>{
        return hotel.address.toLowerCase().includes(searchHD.toLowerCase())
      })
    }
  }

}
