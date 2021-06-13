import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service'
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  animations: [fadeIn]
})
export class ListUsersComponent implements OnInit {
  
  users:[];
  search;

  constructor(private restUser:RestUserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res.userFinds){
        this.users = res.userFinds;
        console.log(this.users)
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message));
  }
}
