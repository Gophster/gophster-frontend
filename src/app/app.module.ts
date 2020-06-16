import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './partials/auth/auth.component';
import { RegistrationComponent } from './partials/registration/registration.component';
import { AuthService } from './services';
import { RegistrationService } from './services';
import { ResetpwdComponent } from './partials/resetpwd/resetpwd.component';
import { StateService } from './services/state/state.service';
import { DashboardComponent } from './partials/main/dashboard/dashboard.component';
import { MainComponent } from './partials/main/main.component';
import { MainModule } from './partials/main';
import {TokenInterceptor} from './interceptors/interceptor';
import {GophsService} from './services/gophs/gophs.service';
import { ProfileComponent } from './partials/profile/profile.component';
import {UserService} from './services/user/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './partials/notfound/notfound.component';
import {NotificationsService} from './services/notifications/notifications.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://api.gophster.localhost', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    ResetpwdComponent,
    ProfileComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService,
    RegistrationService,
    StateService,
    GophsService,
    UserService,
    NotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
