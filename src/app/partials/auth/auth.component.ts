import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICONS, IMAGES } from '../../utils';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import {StateService} from '../../services/state/state.service';
import jwtDecode from 'jwt-decode';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  public iconPath: string = ICONS;
  public imagePath: string = IMAGES;
  public user: any = {
    login: '',
    password: ''
  };
  public errorDisplay = false;
  public errorText = '';
  public registrired: boolean;

  private loginSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService, public stateService: StateService) {}

  ngOnInit(): void {
    this.registrired = this.stateService.registrired;
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    this.stateService.registrired = false;
  }
  public onResetClick() {
    this.router.navigate(['/resetpwd']);
  }
  public onRegisterClick() {
    this.router.navigate(['/register']);
  }
  public login(f: NgForm) {
    this.loginSubscription = this.authService.loginRequest(this.user).subscribe(
      (response) => {
        // response = jwtDecode(response.accessToken);
        localStorage.setItem('access_token', response.accessToken);
        this.stateService.token = response.accessToken;
        this.router.navigate(['']);
      },
      (error) => {
        this.errorDisplay = true;
        this.errorText = 'Invalid Credentials!';
      }
    );
}
}
