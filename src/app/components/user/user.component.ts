import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/animations';
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { UploadUserService } from '../../services/uploadUser/upload-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [ fadeIn ]
})
export class UserComponent implements OnInit {

  public title;
  public user:User;
  public token;
  public possiblePass;
  public filesToUpload:Array<File>;
  public message;
  public status:boolean;
  public uri;

  constructor(private restUser:RestUserService, private router:Router, private uploadUser:UploadUserService) { 
    this.title = 'Your Account';
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.possiblePass = '';
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    delete this.user.password;
    delete this.user.role;
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }else{
        this.status = false;
        this.message = res.message;
        this.user = this.restUser.getUser();
      }
    },
    error=> alert(error.error.message))
  }
  
  deleteAccount(){
    this.restUser.deteleUser(this.user._id, this.possiblePass).subscribe((res:any)=>{
      if(!res.userRemoved){
        alert(res.message)
      }else{
        alert(res.message);
        localStorage.clear();
        this.router.navigateByUrl('home')
      }
    },
    error=> alert(error.error.message))
  }
  fileChange(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
}

uploadImage(){
  this.uploadUser.fileRequest(this.user._id, [], this.filesToUpload, this.token, 'image')
    .then((res:any)=>{
      if(res.user){
        this.user.image = res.userImage;
        localStorage.setItem('user', JSON.stringify(this.user));
      }else{
        alert(res.message)
      }
    })
}
}