import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { fadeIn } from '../../animations/animations';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css'],
  animations: [fadeIn]
})
export class SaveUserComponent implements OnInit {
  public user: User;
  public roleOptions = ['ROLE_ADMIN', 'ROLE_ADMIN_HOTEL', 'ROLE_USER']
  public userLogg;
  public token;

  constructor( private restUser:RestUserService) { 
    this.user = new User('','','', '', '', '', '', '', '', '','',[],[],[]);
    this.userLogg = this.restUser.getUser();
    this.token = this.restUser.getToken();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    this.restUser.saveUserByAdmin(this.user, this.userLogg._id).subscribe((res:any)=>{
      if(res.userSaved){
        alert(res.message);
        this.user = new User('','','', '', '', '', '', '', '', '','',[],[],[]);
        statusForm.reset();
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message)
    )
  }
}
