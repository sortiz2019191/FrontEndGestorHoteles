import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animations';
import { Event } from '../../models/event';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestEventService } from '../../services/restEvent/rest-event.service';
import { Router } from '@angular/router';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [fadeIn]
})
export class EventComponent implements OnInit {
  events: [];
  public token;
  hotel;
  eventSelected;
  user;

  constructor(private restHotel:RestHotelService, private router:Router, private restEvent:RestEventService) {}

  ngOnInit(): void {
    this.eventSelected = new Event('','','','',null);
    this.token = this.restHotel.getToken();
    this.hotel = this.restHotel.getHotel();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.events = this.hotel.event;
    console.log(this.events)
  }

  getEvent(event){
    this.eventSelected = event;
    console.log(event)
  }

  updateEvent(){
    this.restEvent.updateEvent(this.hotel._id, this.eventSelected).subscribe((res:any)=>{
      if(res.updateEvent){
        alert(res.message)
        localStorage.setItem('hotel', JSON.stringify(this.hotel))
        this.hotel = this.restHotel.getHotel();
        this.events = this.hotel.room;
      }else{
        alert(res.message)
        this.hotel = this.restHotel.getHotel();
        this.events = this.hotel.event;
      }
    },
    error => alert(error.error.message)
    )
  }

  removeEvent(){
    this.restEvent.removeEvent(this.hotel._id, this.eventSelected).subscribe((res:any)=>{
      if(res.eventPull){
        alert(res.message)
        localStorage.setItem('hotel', JSON.stringify(res.eventPull))
        this.hotel = this.restHotel.getHotel();
        this.events = this.hotel.event;
      }else{
        alert(res.message)
        
      }
    },
    error => alert(error.error.message)
    )
  }
}
