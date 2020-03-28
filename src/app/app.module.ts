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

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
