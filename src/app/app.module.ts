import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MyNavbarComponent } from './my-navbar/my-navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { RoomComponent } from './room/room.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterService } from './register/service/register.service';
import { LoginService } from './login/service/login.service';
import { RoomService } from './room/service/room.service';
import { ChatService } from './chat/service/chat.service';
import { MessageOnListComponent } from './message-on-list/message-on-list.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'room', component: RoomComponent },
  { path: 'chat', redirectTo: '/room', pathMatch: 'full' },
  { path: 'chat/:room_gid', component: ChatComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavbarComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    RoomComponent,
    PageNotFoundComponent,
    MessageOnListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes: true
    ),
    HttpClientModule
  ],
  providers: [
    CookieService,
    RegisterService,
    LoginService,
    RoomService,
    ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
