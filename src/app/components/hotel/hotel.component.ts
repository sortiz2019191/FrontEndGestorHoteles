import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animations';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { Hotel } from '../../models/hotel';
import { RestRoomService } from '../../services/restRoom/rest-room.service';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  animations: [fadeIn]
})
export class HotelComponent implements OnInit {


  public title;
  public hotel:Hotel;
  public token;
  public possiblePass;
  public filesToUpload:Array<File>;
  public message;
  public status:boolean;
  public uri;
  HotelSelect: Hotel;
  userSelected;

  users:[];
  searchR;
  user;


  constructor(private restHotel:RestHotelService, private router:Router, private restUser:RestUserService) {
    this.title = 'Your hotel';
    this.hotel = this.restHotel.getHotel();
    this.token = this.restHotel.getToken();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.possiblePass = '';
    this.uri = CONNECTION.URI;
   }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.restHotel.updateHotel(this.hotel).subscribe((res:any)=>{
      if(res.hotelUpdated){
        this.status = true;
        this.message = res.message;
        localStorage.setItem('hotel', JSON.stringify(res.hotelUpdated))
      }else{
        this.status = false;
        this.message = res.message;
        this.hotel = this.restHotel.getHotel();
      }
    },
    error=> alert(error.error.message))
  }

  getUserH(user){
    this.userSelected = user;
    console.log(user)
  }

  goRoom(hotel){
    this.HotelSelect = hotel;
    localStorage.setItem('hotel', JSON.stringify(hotel));
    this.router.navigateByUrl('room');
   }

  goEvent(hotel){
    this.HotelSelect = hotel;
    localStorage.setItem('hotel', JSON.stringify(hotel));
     this.router.navigateByUrl('event');
   }

  returnToList(){
    this.router.navigateByUrl('listHotels')
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
