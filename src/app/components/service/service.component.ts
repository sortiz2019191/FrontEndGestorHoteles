import { Component, DoCheck, OnInit } from '@angular/core';
import { RestServiceService } from '../../services/restService/rest-service.service'
import { fadeIn } from '../../animations/animations';
import { animation } from '@angular/animations';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { RestUserService } from '../../services/restUser/rest-user.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  animations: [fadeIn]
})
export class ServiceComponent implements OnInit {

  services:[];
  search;

  public service: Service;
  public message;
  public serviceSaved:string;
  serviceSelect: Service;
  public token;
  
  

  constructor(private restService:RestServiceService, private router: Router) { 
    this.service = new Service('','','','')
    this.token = this.restService.getToken();
    this.listServices();
  }

  ngOnInit(): void {
    this.serviceSelect = new Service('','','','');
  }


  listServices(){
    this.restService.getServices().subscribe((res:any)=>{
      if(res.servicesFound){
        this.services = res.servicesFound;
        console.log(this.services)
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message));
  }

  onSubmit(savedat){
    console.log(this.service);
    this.restService.createService(this.service).subscribe((res:any)=>{
      this.message = res.message;
      if(res.serviceSaved){
        this.serviceSaved = res.serviceSaved.name
        this.service = new Service('','','','');
        alert(this.message);
        location.reload();
      }else{
        alert(this.message);
      } 
    },
    error=> console.log(<any>error)
    )
  }




  getService(service){
    this.serviceSelect = service;
    console.log(service._id)
  }

  updateService(){
    this.restService.updateService(this.serviceSelect).subscribe((res:any)=>{
      if(res.serviceUpdated){
        alert(res.message)
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message)
    )
  }
  
  deleteService(){
    this.restService.deteleService(this.serviceSelect).subscribe((res:any)=>{
      if(!res.serviceRemoved){
        alert(res.message)
      }else{
        alert(res.message);
      }
    },
    error=> alert(error.error.message))
  }
}
