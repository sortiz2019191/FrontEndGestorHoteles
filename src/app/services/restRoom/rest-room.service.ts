import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from "../../services/restUser/rest-user.service";

@Injectable({
  providedIn: 'root'
})
export class RestRoomService {

  public uri: string;
  public token;
  public room;
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

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient, private restHotel:RestHotelService) {
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

  saveRoom(idHotel, room){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(room);
    return this.http.put(this.uri+'setRoom/'+ idHotel, params,  {headers: headers})
    .pipe(map(this.extractData))
  }

  updateRoom(idHotel, room){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(room);
    return this.http.put(this.uri+idHotel+'/updateRoom/'+room._id , params,  {headers: headers})
    .pipe(map(this.extractData))
  }

  removeRoom(idHotel, idRoom){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+idHotel+'/deleteRoom/'+idRoom , null,  {headers: headers})
    .pipe(map(this.extractData))
  }

}
