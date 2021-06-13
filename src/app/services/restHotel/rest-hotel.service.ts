import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { RestUserService } from "../../services/restUser/rest-user.service";

@Injectable({
  providedIn: 'root'
})
export class RestHotelService {

  public uri: string;
  public token;
  public hotel;
  public user;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  }
  restHotel: any;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
   }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != null || token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  saveHotelByAdmin(hotel, idAdmin){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(hotel);
    return this.http.post(this.uri+'createHotel', params,  {headers: headers})
    .pipe(map(this.extractData))
  }

   getHotels(){
     return this.http.get(this.uri+'getHotels')
     .pipe(map(this.extractData))
   }

   getAdmins(){
    return this.http.post(this.uri+'getAdmin', this.httpOptions)
    .pipe(map(this.extractData))
  }

   updateHotel(hotelToUpdate){
     let params = JSON.stringify(hotelToUpdate);
     let headers = new HttpHeaders({
       'Concept-type': 'aplication/json',
       'Authorization': this.getToken()
     })
     return this.http.put(this.uri+'updateHotel/'+hotelToUpdate._id, params, {headers: headers})
     .pipe(map(this.extractData))
   }

   getHotel(){
      let hotel = JSON.parse(localStorage.getItem('hotel'));
      if(hotel != null || hotel != undefined){
        this.hotel = hotel;
      }else{
        this.hotel = null;
      }
      return this.hotel;     
   }

   deleteHotel(idHotel){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
      let params = JSON.stringify(idHotel);
      return this.http.put(this.uri+'deleteHotel/'+idHotel._id,null, {headers: headers})
      .pipe(map(this.extractData))
    }
    

}
