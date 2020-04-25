import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public username: string = "";
  public obj: any = {};
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.obj = jwtDecode(localStorage.getItem("access_token"));
  }

  public onLogOut() {
    localStorage.clear();
    this.router.navigate(["/auth"]);
  }
}
