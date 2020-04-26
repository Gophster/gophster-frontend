import {Component, OnDestroy, OnInit, HostListener} from '@angular/core';
import jwtDecode from "jwt-decode";
import {GophsService} from '../../../services/gophs/gophs.service';
import {Subscription} from 'rxjs';
import {repeat} from 'rxjs/operators';
import Swal from "sweetalert2";
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
  public queryParams = {
    currentPage: 2,
    totalPages: null
  };
  public posts = [];

  private getGophsSubscription: Subscription;
  private postGophSubscription: Subscription;
  private deleteGophSubscription: Subscription;
  private editGophSubscription: Subscription;


  onScroll() {
    history.scrollRestoration = 'manual';
    if (this.queryParams.currentPage <= this.queryParams.totalPages) {
      this.getGophs(`?page=${this.queryParams.currentPage}`);
      this.queryParams.currentPage++;
    }
  }



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
        this.posts.unshift(response);
      }, (error) => {
        alert(error);
      });
      this.post = '';
    }
  }

  public getGophs(params?: any) {
    this.getGophsSubscription = this.gophsService.getGoph(params).subscribe((response) => {
      this.posts.push(... response.items);
      this.queryParams.totalPages = response.meta.totalPages;
      // this.queryParams.next = response.links.next.substr(response.links.next.indexOf('?'), response.links.next.length);
      // this.queryParams.last = response.links.last.substr(response.links.last.indexOf('?'), response.links.last.length);

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
        const editedGoph = this.posts.find(item => item.id === response.id);
        editedGoph.text = response.text;
        this.cancelEditGoph();
        Swal.fire({
          title: "",
          text: "The Goph has successfuly updated",
          icon: "success",
          confirmButtonColor: "rgb(171, 119, 75)",
          timer: 3000,
        });
      });
    }
  }

  public cancelEditGoph() {
    this.post = '';
    this.selectedItemId = null;
    this.editMode = false;
  }
}
