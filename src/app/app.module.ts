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

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatSocketService } from './chat/service/chat.socketService';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

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
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes: true
    ),
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      enableHtml: true,
  }),
  ],
  providers: [
    CookieService,
    RegisterService,
    LoginService,
    RoomService,
    ChatService,
    ChatSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
