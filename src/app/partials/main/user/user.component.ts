import { Component, OnInit } from "@angular/core";
import jwtDecode from "jwt-decode";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  constructor() {}
  public obj: any = {};
  ngOnInit(): void {
    this.obj = jwtDecode(localStorage.getItem("access_token"));

  }
}
