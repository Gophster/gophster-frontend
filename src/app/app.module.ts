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


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    ResetpwdComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
  ],
  providers: [
    AuthService,
    RegistrationService,
    StateService,
    GophsService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
