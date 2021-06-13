import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RestUserService } from '../app/services/restUser/rest-user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SaveUserComponent } from './components/save-user/save-user.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SearchPipe } from './pipes/search.pipe';
import { SaveHotelComponent } from './components/save-hotel/save-hotel.component';
import { ServiceComponent } from './components/service/service.component';
import { RoomComponent } from './components/room/room.component';
import { EventComponent } from './components/event/event.component';
import { SearchHPipe } from './pipes/search-h.pipe';
import { ListHotelsComponent } from './components/list-hotels/list-hotels.component';
import { SearchHDPipe } from './pipes/search-hd.pipe';
import { ListRoomsComponent } from './components/list-rooms/list-rooms.component';
import { SaveEventComponent } from './components/save-event/save-event.component';
import { SearchRPipe } from './pipes/search-r.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    GetUsersComponent,
    UserComponent,
    SaveUserComponent,
    HotelComponent,
    ListUsersComponent,
    SearchPipe,
    SaveHotelComponent,
    ServiceComponent,
    RoomComponent,
    EventComponent,
    SearchHPipe,
    ListHotelsComponent,
    SearchHDPipe,
    ListRoomsComponent,
    SaveEventComponent,
    SearchRPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [RestUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
