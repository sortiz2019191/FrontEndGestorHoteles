import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';

@Injectable({
  providedIn: 'root'
})
export class RestEventService {

  public uri: string;
  public token;
  public event;
  public hotel;

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

  saveEvent(idHotel, event){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(event);
    return this.http.put(this.uri+'setEvent/'+ idHotel, params, {headers: headers})
    .pipe(map(this.extractData))
  }

  updateEvent(idHotel, event){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(event);
    return this.http.put(this.uri+idHotel+'/updateEvent/'+event._id , params,  {headers: headers})
    .pipe(map(this.extractData))
  }

  removeEvent(idHotel, event){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(event);
    return this.http.put(this.uri+idHotel+'/deleteEvent/'+event._id , null,  {headers: headers})
    .pipe(map(this.extractData))
  }

}