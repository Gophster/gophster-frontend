import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent implements OnInit {
  post: string = "test";

  posts = [];
  constructor() {}
  ngOnInit(): void {}
  onGopher() {
    this.posts.push(this.post);

    console.log(this.post);
  }
}
