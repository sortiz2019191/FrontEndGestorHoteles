import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animations';
import { User } from '../../models/user';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeIn]
})
export class RegisterComponent implements OnInit {

  public user: User;
  public message;
  public userSaved:string;
  

  constructor(private userService:RestUserService, private router: Router) { 
    this.user = new User('','','', '', '', '', '', '', 'ROLE_USER', '','',null,null,null);//name,lastname,username,password,email,image,role,phone
  }

  ngOnInit(): void {
  }


  onSubmit(register){
    console.log(this.user);
    this.userService.register(this.user).subscribe((res:any)=>{
      this.message = res.message;
      if(res.userSaved){
        this.userSaved = res.userSaved.username
        alert(this.message);
        register.reset();
      }else{
        alert(this.message);
      }
    },
    error=> console.log(<any>error)
    )
  }
}
