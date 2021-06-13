import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  public uri: string;
  public service;
  public token;

  public httpOp
  tions = {
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

  getToken(){
    let token = localStorage.getItem('token');
    if(token != null || token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  getServices(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'getServices', {headers: headers})
    .pipe(map(this.extractData))
  }

  getService(){
    let service = JSON.parse(localStorage.getItem('service'));
    if(service != null || service != undefined){
      this.service = service;
    }else{
      this.service = null;
    }
    return this.service;
  }

  createService(service){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(service);
    return this.http.post(this.uri + 'createService', params, {headers: headers})
    .pipe(map(this.extractData));
  }

  updateService(service){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(service);
    return this.http.put(this.uri+'updateService/'+service._id, params,  {headers: headers})
    .pipe(map(this.extractData))
  }

  deteleService(idService){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(idService);
    return this.http.put(this.uri+'deleteService/'+idService._id,null, {headers: headers})
    .pipe(map(this.extractData))
  }
}
