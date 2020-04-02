import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './partials/auth/auth.component';
import {RegistrationComponent} from './partials/registration/registration.component';
import {AuthService} from './services';
import {RegistrationService} from './services';
import { ResetpwdComponent } from './partials/resetpwd/resetpwd.component';
import {StateService} from "./services/state/state.service";


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    ResetpwdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, RegistrationService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
