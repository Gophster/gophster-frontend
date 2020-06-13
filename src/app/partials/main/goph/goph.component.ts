import {Component, OnDestroy, OnInit, HostListener} from '@angular/core';
import jwtDecode from 'jwt-decode';
import {GophsService} from '../../../services/gophs/gophs.service';
import {Subscription} from 'rxjs';
import {repeat} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-goph',
  templateUrl: './goph.component.html',
  styleUrls: ['./goph.component.scss']
})
export class GophComponent implements OnInit, OnDestroy {
  public post = '';
  public obj: any = {};
  public editMode = false;
  public selectedItemId: number;
  public countStringSize = 290;
  public queryParams = {
    currentPage: 2,
    totalPages: null
  };
  public goph: {
    text: any;
    author: {
      avatar: string | any,
      handle: string
    };
  } = {
    text: '',
    author: {
      avatar: '',
      handle: ''
  }};


  private getGophSubscription: Subscription;
  private postGophSubscription: Subscription;
  private deleteGophSubscription: Subscription;
  private editGophSubscription: Subscription;


  // onScroll() {
  //   history.scrollRestoration = 'manual';
  //   if (this.queryParams.currentPage <= this.queryParams.totalPages) {
  //     this.getGophs(`?page=${this.queryParams.currentPage}`);
  //     this.queryParams.currentPage++;
  //   }
  // }



  constructor(private gophsService: GophsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obj = jwtDecode(localStorage.getItem('access_token'));
    this.getGoph(this.route.snapshot.params.id);
  }

  ngOnDestroy(): void {
    if (this.postGophSubscription) {
      this.postGophSubscription.unsubscribe();
    }
    if (this.getGophSubscription) {
      this.getGophSubscription.unsubscribe();
    }
    if (this.deleteGophSubscription) {
      this.deleteGophSubscription.unsubscribe();
    }
    if (this.editGophSubscription) {
      this.editGophSubscription.unsubscribe();
    }
  }

  // onGopher() {
  //   if (this.countStringSize >= this.post.length ) {
  //     const sendObject = {
  //       text: this.post
  //     };
  //     this.postGophSubscription = this.gophsService.postGoph(sendObject).subscribe((response) => {
  //       this.posts.unshift(response);
  //     }, (error) => {
  //       alert(error);
  //     });
  //     this.post = '';
  //   }
  // }
  //
  public  getGoph(params?: any) {
    this.getGophSubscription = this.gophsService.getGoph(params).subscribe((response) => {
      // this.posts.push(... response.items);
      this.goph = response;
      // this.queryParams.totalPages = response.meta.totalPages;
      // this.queryParams.next = response.links.next.substr(response.links.next.indexOf('?'), response.links.next.length);
      // this.queryParams.last = response.links.last.substr(response.links.last.indexOf('?'), response.links.last.length);
    });
  }

}
