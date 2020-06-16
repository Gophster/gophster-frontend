import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { GophsService } from '../../../services/gophs/gophs.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-goph',
  templateUrl: './goph.component.html',
  styleUrls: ['./goph.component.scss'],
})
export class GophComponent implements OnInit, OnDestroy {
  public obj: any = {};
  public replies = [];
  public editMode = false;
  public reply: string;
  public goph: {
    text: any;
    created: any;
    updated: any;
    author: {
      name: string,
      avatar: string | any;
      handle: string;
    };
  } = {
    text: '',
    created: '',
    updated: '',
    author: {
      name: '',
      avatar: '',
      handle: ''
  }};
  public queryParams = {
    currentPage: 2,
    totalPages: null
  };


  private getGophSubscription: Subscription;
  private postGophSubscription: Subscription;
  private deleteGophSubscription: Subscription;
  private editGophSubscription: Subscription;
  private getRepliesSubscription: Subscription;
  private postReplySubscription: Subscription;

  constructor(private gophsService: GophsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obj = jwtDecode(localStorage.getItem('access_token'));
    this.getGoph(this.route.snapshot.params.id);
    this.getReplies(this.route.snapshot.params.id);
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
    if (this.getRepliesSubscription) {
      this.getRepliesSubscription.unsubscribe();
    }
    if (this.postReplySubscription) {
      this.postReplySubscription.unsubscribe();
    }
  }


  public getGoph(gophId: any) {
    this.getGophSubscription = this.gophsService
      .getGoph(gophId)
      .subscribe((response) => {
        this.goph = response;
        const dateTimeFormat = new Intl.DateTimeFormat('en', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        });
        const [
          { value: month },
          ,
          { value: day },
          ,
          { value: year },
        ] = dateTimeFormat.formatToParts(Date.parse(this.goph.created));
        this.goph.created = `${day} ${month} ${year}`;
      });
  }

  public getReplies(gophId: string, params?: any) {
    this.getRepliesSubscription = this.gophsService.getReplies(gophId, params).subscribe((response) => {
      this.replies = response.items;
      if (params) {
        this.replies.push(... response.items);
      } else {
        this.replies = response.items;
      }
      this.queryParams.totalPages = response.meta.totalPages;
    });
  }

  public onReply(goph) {
    this.postReplySubscription = this.gophsService.postReply(this.reply, goph.id).subscribe((response) => {
      this.replies.unshift(response);
      $('#addReplay').modal('hide');
    });
  }

  onScroll() {
    history.scrollRestoration = 'manual';
    if (this.queryParams.currentPage <= this.queryParams.totalPages) {
      this.getReplies(this.route.snapshot.params.id, `?page=${this.queryParams.currentPage}`);
      this.queryParams.currentPage++;
    }
  }
}
