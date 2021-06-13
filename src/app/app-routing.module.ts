import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { SaveUserComponent } from './components/save-user/save-user.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AdminGuard } from './guards/admin.guard';
import { SaveHotelComponent } from './components/save-hotel/save-hotel.component';
import { ServiceComponent } from './components/service/service.component';
import { ListHotelsComponent } from './components/list-hotels/list-hotels.component';
import { RoomComponent } from './components/room/room.component';
import { EventComponent } from './components/event/event.component';
import { ListRoomsComponent } from './components/list-rooms/list-rooms.component';
import { SaveEventComponent} from './components/save-event/save-event.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'getusers', component: GetUsersComponent},
  {path: 'user', component: UserComponent},
  {path: 'saveUser', canActivate: [AdminGuard], component: SaveUserComponent},
  {path: 'listusers', canActivate: [AdminGuard], component: ListUsersComponent},
  {path: 'hotel', component: HotelComponent},
  {path: 'listUsers', component: ListUsersComponent},
  {path: 'saveHotel', canActivate: [AdminGuard], component: SaveHotelComponent},
  {path: 'services', component: ServiceComponent },
  {path: 'listHotels', component: ListHotelsComponent },
  {path: 'room', component: RoomComponent},
  {path: 'event', component: EventComponent},
  {path: 'rooms',  component: ListRoomsComponent},
  {path: 'saveEvent', component: SaveEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
