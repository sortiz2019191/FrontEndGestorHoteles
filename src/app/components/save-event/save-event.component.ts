import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animations';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { RestEventService } from '../../services/restEvent/rest-event.service';

@Component({
  selector: 'app-save-event',
  templateUrl: './save-event.component.html',
  styleUrls: ['./save-event.component.css'],
  animations: [fadeIn]

})
export class SaveEventComponent implements OnInit {

  public event: Event;
  public eventLogg;
  public token;
  public hotel;

  constructor(private restEvent:RestEventService, private restHotel:RestHotelService, private router: Router) {
    this.event = new Event('','','','',null);
   }

  ngOnInit(): void {
    this.hotel = this.restHotel.getHotel();
    this.token = this.restHotel.getToken();
  }

  onSubmit(saveEvent){
    this.restEvent.saveEvent(this.hotel._id, this.event).subscribe((res:any)=>{
      if(res.pushEvent){
        alert(res.message)
        saveEvent.reset()
        this.hotel = res.pushEvent;
        localStorage.setItem('hotel', JSON.stringify(this.hotel))
        this.router.navigateByUrl('event')
      }else{
        alert(res.message)
      }
    }, 
    error=> alert(error.error.message))
  }

}
