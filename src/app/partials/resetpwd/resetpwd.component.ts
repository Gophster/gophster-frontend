import { Component, OnInit } from '@angular/core';
import { ICONS, IMAGES } from '../../utils';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss'],
})
export class ResetpwdComponent implements OnInit {
  public imagePath: string = IMAGES;
  public user: any = {
    email: '',
  };
  public emailErrorText = '';
  public emailInpErr = false;
  public handleInpErr = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.emailInpErr) {
      Swal.fire({
        title: '',
        text: 'Reset Password Instruction was sent to ' + this.user.email,
        icon: 'success',
        confirmButtonColor: 'rgb(171, 119, 75)',
        timer: 5000,
      });
      // this.router.navigate(["/auth"]);
    }
  }
  onBackToLogin() {
    this.router.navigate(['/auth']);
  }
  public validateEmail() {
    if (this.user.email === '') {
      this.emailErrorText = '* Please fill in the email field';
      this.emailInpErr = true;
      return;
    }
    if (!/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(this.user.email)) {
      this.emailErrorText = '* Email isn\'t valid';
      this.emailInpErr = true;
      return;
    }
  }
  public validateEmailKeyCode() {
    this.emailInpErr = false;
  }
}
