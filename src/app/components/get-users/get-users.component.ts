import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animations';


@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css'],
  animations: [fadeIn]
})
export class GetUsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
