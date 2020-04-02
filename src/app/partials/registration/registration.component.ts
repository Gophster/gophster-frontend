import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { ICONS, IMAGES } from '../../utils';
import { NgForm } from '@angular/forms';
import {Subscription} from 'rxjs';
import {RegistrationService} from '../../services';
import {StateService} from "../../services/state/state.service";


@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public iconPath: string = ICONS;
  public imagePath: string = IMAGES;
  public handleErrorText: string = '';
  public emailErrorText: string = '';
  public passwordErrorText: string  = '';
  public confirmPassErrorText: string = '';
  public emailInpErr: boolean = false;
  public handleInpErr: boolean = false;
  public passInpErr: boolean = false;
  public confPassInpErr: boolean = false;
  public password2 = '';
  public user: any = {
    email: '',
    handle: '',
    password: '',
    confirmPassword: ''
  };

  private registrationSubscription: Subscription;

  constructor(private router: Router, private registrationService: RegistrationService, public stateService: StateService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }

  public onLogin() {
    this.router.navigate(['/auth']);
  }

  public validatePassword() {
    if (this.user.password === '') {
      this.passwordErrorText = '* Please fill in the password field';
      this.passInpErr = true;
      return;
    }
    if (!(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/.test(this.user.password))) {
      this.passwordErrorText = '* Password isn\'t valid';
      this.passInpErr = true;
      return;
    }
  }
  public validatePasswordKey() {
    this.passInpErr = false;
  }

  public validateEmail() {
    if (this.user.email === '') {
      this.emailErrorText = '* Please fill in the email field';
      this.emailInpErr = true;
      return;
    }
    if (!(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(this.user.email))) {
      this.emailErrorText = '* Email isn\'t valid';
      this.emailInpErr = true;
      return ;
    }
  }
  public validateEmailKeyCode() {
    this.emailInpErr = false;
  }

  public validateHandle() {
    if (this.user.handle === '') {
      this.handleErrorText = '* Please fill in the handle field';
      this.handleInpErr = true;
      return;
    }
    if (this.user.handle.length === 1) {
      this.handleErrorText = '* Handle should be more than 1 character';
      this.handleInpErr = true;
      return;
    }
  }
  public validateHandleKey() {
      this.handleInpErr = false;
  }

  public validateConfirmPassword() {
    if (this.user.confirmPassword === '') {
      this.confirmPassErrorText = '* Please confirm the password';
      this.confPassInpErr = true;
      return;
    }
    if (this.user.confirmPassword !== this.user.password) {
      this.confirmPassErrorText = '* Passwords doesn\'t match';
      this.confPassInpErr = true;
      return;
    }
  }
  public validateConfirmPasswordKey() {
    this.confPassInpErr = false;
  }

  public login(f: NgForm) {
    if (f.valid && this.user.password === this.user.confirmPassword) {
      this.registrationSubscription = this.registrationService.registerRequest(this.user).subscribe((response) => {
        this.stateService.registrired = true;
        this.router.navigate(['/auth']);
      }, (error) => {
        // error = JSON.parse(error);
        console.log(error.error.message);
        if (error.error.statusCode === 409) {
          if (error.error.message.includes('handle')) {
            this.handleErrorText = '* Handle already exists';
            this.handleInpErr = true;
          } else {
            this.emailErrorText = '* Email already exists';
            this.emailInpErr = true;
          }
        }
        for (const obj of error.error.message) {
          if (obj.property === 'email') {
            this.emailErrorText = '* ' + obj.constraints.isEmail;
            this.emailInpErr = true;
          }
          if (obj.property === 'handle') {
            this.handleErrorText = '* ' + obj.constraints.minLength;
            this.handleInpErr = true;
          }
          if (obj.property === 'password') {
            const object = obj.constraints;
            if (Object.keys(object).length > 1) {
              this.passwordErrorText = '* ' + obj.constraints.matches + obj.constraints.minLength;
            } else {
              this.passwordErrorText = object.minLength ? '* ' + object.minLength : '* ' + object.matches;
            }
            this.passInpErr = true;
          }
        }
      });
    } else {
      this.validateConfirmPassword();
      this.validatePassword();
      this.validateHandle();
      this.validateEmail();
    }
  }
}
