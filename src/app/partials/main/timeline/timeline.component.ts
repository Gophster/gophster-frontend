import { Component, OnInit } from "@angular/core";
import jwtDecode from "jwt-decode";
@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent implements OnInit {
  post: string = "";
  
  public obj: any = {};
  posts = [];
  constructor() {}
  ngOnInit(): void {
    this.obj = jwtDecode(localStorage.getItem("access_token"));

    console.log(this.obj);
  }
  onGopher() {
    this.posts.unshift(this.post);
    this.post = "";
  }
}
