import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animations';
import { RestRoomService } from '../../services/restRoom/rest-room.service';
import { Room } from '../../models/room';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css'],
  animations: [fadeIn]

})
export class ListRoomsComponent implements OnInit {

  public room: Room;
  public roomLogg;
  public token;
  public hotel;
  public user;

  constructor(private restRoom:RestRoomService, private restHotel:RestHotelService) { 
    this.room = new Room('','','',null);
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.hotel = this.restHotel.getHotel();
    this.token = this.restHotel.getToken();
  }

  onSubmit(saveRoom){
    this.restRoom.saveRoom(this.hotel._id, this.room).subscribe((res:any)=>{
      if(res.pushRoom){
        alert(res.message)
        saveRoom.reset()
        this.hotel = res.pushRoom;
        localStorage.setItem('hotel', JSON.stringify(this.hotel))
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message))
  }
}
