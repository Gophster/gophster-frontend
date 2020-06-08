import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-bottom-nav-bar",
  templateUrl: "./bottom-nav-bar.component.html",
  styleUrls: ["./bottom-nav-bar.component.scss"],
})
export class BottomNavBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  public onProfileRedirect() {
    this.router.navigate(["/user"]);
  }
  public onLogOut() {
    localStorage.clear();
    this.router.navigate(["/auth"]);
  }
  public onMessage() {
    this.router.navigate(["/message"]);
  }
  public onNotification() {
    this.router.navigate(["/notification"]);
  }
}
