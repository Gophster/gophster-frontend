import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ICONS, IMAGES } from "../../utils";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnDestroy {
  public iconPath: string = ICONS;
  public imagePath: string = IMAGES;
  public user: any = {
    login: "",
    password: ""
  };
  public errorDisplay: boolean = false;
  public errorText: string = "";

  private loginSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
  public onResetClick() {
    this.router.navigate(["/resetpwd"]);
  }
  public onRegisterClick() {
    this.router.navigate(["/register"]);
  }
  public login(f: NgForm) {
    this.loginSubscription = this.authService.loginRequest(this.user).subscribe(
      response => {},
      error => {
        this.errorDisplay = true;
        this.errorText = "Invalid Credentials!";
      }
    );
  }
}
