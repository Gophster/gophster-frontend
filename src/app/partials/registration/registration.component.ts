import {Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { ICONS, IMAGES } from '../../utils';
import { NgForm } from '@angular/forms';
import {Subscription} from 'rxjs';
import {RegistrationService} from '../../services';


@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {
  public iconPath: string = ICONS;
  public imagePath: string = IMAGES;
  public user: any = {
    email: '',
    handle: '',
    password: '',
    confirmPassword: ''
  };

  private registrationSubscription: Subscription;

  constructor(private router: Router, private registrationService: RegistrationService) {
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }

  public onLogin() {
    this.router.navigate(['/auth']);
  }

  public login(f: NgForm) {
    this.registrationSubscription = this.registrationService.registerRequest(this.user).subscribe((response) => {

    }, (error) => {
      console.log(error);
    });
  }
}
