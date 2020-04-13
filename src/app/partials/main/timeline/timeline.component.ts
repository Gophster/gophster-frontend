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
  public post: string = "";
  public obj: any = {};
  public editMode: boolean = false;
  public selectedItemId: number;
  public countStringSize: number = 290;
  posts = [];

  private getGophsSubscription: Subscription;
  private postGophSubscription: Subscription;
  private deleteGophSubscription: Subscription;
  private editGophSubscription: Subscription;

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
    if (this.editGophSubscription) {
      this.editGophSubscription.unsubscribe();
    }
  }

  onGopher() {
    if (this.countStringSize >= this.post.length ) {
      const sendObject = {
        text: this.post
      };
      this.postGophSubscription = this.gophsService.postGoph(sendObject).subscribe((response) => {
        this.getGophs();
      }, (error) => {
        alert(error);
      });
      this.post = '';
    }
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

  public editGoph(item) {
    this.post = item.text;
    this.editMode = true;
    this.selectedItemId = item.id;
  }

  public onEditGoph() {
    if (this.countStringSize >= this.post.length ) {
      const sendObject = {
        text: this.post
      };
      this.editGophSubscription = this.gophsService.editGoph(this.selectedItemId, sendObject).subscribe((response) => {
        this.getGophs();
        this.cancelEditGoph();
      });
    }
  }

  public cancelEditGoph() {
    this.post = '';
    this.selectedItemId = null;
    this.editMode = false;
  }
}
