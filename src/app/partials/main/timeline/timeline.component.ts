import {Component, OnDestroy, OnInit} from '@angular/core';
import jwtDecode from "jwt-decode";
import {GophsService} from '../../../services/gophs/gophs.service';
import {Subscription} from 'rxjs';
import {repeat} from 'rxjs/operators';
@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent implements OnInit,OnDestroy {
  post: string = "";
  public obj: any = {};
  posts = [];

  private getGophsSubscription: Subscription;
  private postGophSubscription: Subscription;
  private deleteGophSubscription: Subscription;

  constructor(private gophsService: GophsService) {}

  ngOnInit(): void {
    this.obj = jwtDecode(localStorage.getItem("access_token"));
    this.getGophs();
  }

  ngOnDestroy(): void {
    if (this.postGophSubscription) {
      this.postGophSubscription.unsubscribe();
    }
    if (this.getGophsSubscription) {
      this.getGophsSubscription.unsubscribe();
    }
    if (this.deleteGophSubscription) {
      this.deleteGophSubscription.unsubscribe();
    }
  }

  onGopher() {
    this.posts.unshift(this.post);
    const obj = {
      text : this.post
    };
    this.postGophSubscription = this.gophsService.postGoph(obj).subscribe((response) => {
      this.getGophs();
    }, (error) => {
      alert(error);
    });
  }

  public getGophs() {
    this.getGophsSubscription = this.gophsService.getGoph().subscribe((response) => {
      this.posts = response;
    });
  }

  public deleteGoph(item: any) {
    this.deleteGophSubscription = this.gophsService.deleteGoph(item.id).subscribe((response) => {
      this.getGophs();
    });
  }
}
