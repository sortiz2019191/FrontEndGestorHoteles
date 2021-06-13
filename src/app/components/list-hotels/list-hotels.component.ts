import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn } from '../../animations/animations';
import { Hotel } from '../../models/hotel';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestRoomService } from '../../services/restRoom/rest-room.service';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.css'],
  animations: [fadeIn]
})
export class ListHotelsComponent implements OnInit {
  
  public hotel:Hotel;
  hotels: [];
  searchH;
  searchHD;
  user;
  HotelSelect: Hotel;

  constructor(private restHotel:RestHotelService, private router: Router) {
    this.HotelSelect = new Hotel('','','', '', '','', '',[],[],[] );
   }

  ngOnInit(): void {
    this.listHotels();
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  listHotels(){
    this.restHotel.getHotels().subscribe((res:any)=>{
      if(res.hotelsFound){
        this.hotels = res.hotelsFound;
        console.log(this.hotels)
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message));
  }

  goHotel(hotel){
    this.HotelSelect = hotel;
    localStorage.setItem('hotel', JSON.stringify(hotel));
    this.router.navigateByUrl('hotel')

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
}
