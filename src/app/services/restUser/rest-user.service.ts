import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestUserService {

  public uri: string;
  public token;
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

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != null || user != undefined){
      this.user = user;
    }else{
      this.user = null;
    }
    return this.user;
  }

  saveUserByAdmin(user, idAdmin){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'createUserAdminHotel', params, this.httpOptionsAuth)
    .pipe(map(this.extractData))
  }

  register(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'register', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  login(user, tokenStatus){
    user.gettoken = tokenStatus;
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'login', params, this.httpOptions)
    .pipe(map(this.extractData))
  }

  updateUser(userToUpdate){
    let params = JSON.stringify(userToUpdate);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'updateUser/'+userToUpdate._id, params, {headers: headers})
    .pipe(map(this.extractData))
  }

  deteleUser(idUser, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'deleteUser/'+idUser, {password: password}, {headers: headers})
    .pipe(map(this.extractData))
  }

  getUsers(){
    return this.http.get(this.uri+'getUsers', this.httpOptionsAuth)
    .pipe(map(this.extractData))
  }

  getAdmins(){
    return this.http.post(this.uri+'getAdmin', this.httpOptions)
    .pipe(map(this.extractData))
  }
}
