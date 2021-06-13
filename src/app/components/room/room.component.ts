import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animations';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestRoomService } from '../../services/restRoom/rest-room.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  animations: [fadeIn]
})
export class RoomComponent implements OnInit {
  rooms:[];
  public token;
  hotel;
  roomSelected;
  user;

  constructor(private restHotel:RestHotelService, private router:Router, private restRoom:RestRoomService) { }

  ngOnInit(): void {
    this.roomSelected = new Room('','','',null);
    this.token = this.restHotel.getToken();
    this.hotel = this.restHotel.getHotel();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rooms = this.hotel.room;
    console.log(this.rooms)
  }

  getRoom(room){
    this.roomSelected = room;
    console.log(room)
  }

  updateRoom(){
    this.restRoom.updateRoom(this.hotel._id, this.roomSelected).subscribe((res:any)=>{
      if(res.updateRoom){
        alert(res.message)
        localStorage.setItem('hotel', JSON.stringify(this.hotel))
      }else{
        alert(res.message)
        this.hotel = this.restHotel.getHotel();
        this.rooms = this.hotel.room;
      }
    },
    error => alert(error.error.message)
    )
  }

  removeRoom(){
    this.restRoom.removeRoom(this.hotel._id, this.roomSelected._id).subscribe((res:any)=>{
      if(res.roomPull){
        alert(res.message)
        localStorage.setItem('hotel', JSON.stringify(res.roomPull))
        this.hotel = this.restHotel.getHotel();
        this.rooms = this.hotel.room;
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message)
    )
  }
}
