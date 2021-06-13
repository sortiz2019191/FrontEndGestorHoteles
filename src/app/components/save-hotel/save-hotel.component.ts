import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { fadeIn } from '../../animations/animations';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-save-hotel',
  templateUrl: './save-hotel.component.html',
  styleUrls: ['./save-hotel.component.css'],
  animations: [fadeIn]
})
export class SaveHotelComponent implements OnInit {
  public hotel:Hotel;
  public message;
  public hotelSaved:string;
  public userLogg;
  public token;
  
  constructor( private restHotel:RestHotelService, private restUser:RestUserService ) { 
    this.hotel = new Hotel('','','', '', '','', '',[],[],[] );
    this.userLogg = this.restUser.getUser();
    this.token = this.restHotel.getToken();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    console.log(this.hotel);
    this.restHotel.saveHotelByAdmin(this.hotel, this.userLogg._id).subscribe((res:any)=>{
      if(res.hotelSaved){
        alert(res.message);
        this.hotel = new Hotel('','','', '', '','', '',[],[],[] );
        statusForm.reset();
      }else{
        alert(res.message)
      }
    },
    error=> console.log(<any>error)
    )
  }
}
