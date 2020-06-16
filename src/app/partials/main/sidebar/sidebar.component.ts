import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user/user.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public usersSuggestions = [];
  public followButton: boolean;
  public mainHandle: string;
  public object: {handle: string} = {handle : ''};

  constructor(private userService: UserService, public router: Router) { }

  private getUsersDataSubscription: Subscription;
  private followUserSubscription: Subscription;
  private unfollowUserSubscription: Subscription;
  private isFollowingSubscription: Subscription;

  ngOnInit(): void {
    this.mainHandle = jwtDecode(localStorage.getItem('access_token')).handle;
    this.getUsersData();
  }

  ngOnDestroy(): void {
    if (this.getUsersDataSubscription) {
      this.getUsersDataSubscription.unsubscribe();
    }
    if (this.followUserSubscription) {
      this.followUserSubscription.unsubscribe();
    }
    if (this.unfollowUserSubscription) {
      this.unfollowUserSubscription.unsubscribe();
    }
    if (this.isFollowingSubscription) {
      this.isFollowingSubscription.unsubscribe();
    }
  }

  public getUsersData() {
    this.getUsersDataSubscription = this.userService
      .getUsersSuggestionData()
      .subscribe((response) => {
        this.usersSuggestions = response;
        for (const obj of this.usersSuggestions) {
          obj.followButton = true;
        }
      });
  }

  public onFollow(item: any) {
    const sendHandle = { handle : item.handle};
    this.followUserSubscription = this.userService.followUser(sendHandle).subscribe((response) => {
      this.getUsersData();
      item.followButton = false;
    });
  }

  public onUnfollow(item: any) {
    const sendHandle = { handle : item.handle};
    this.unfollowUserSubscription = this.userService.unfollowUser(sendHandle).subscribe((response) => {
      item.followButton = true;
    });
  }

}
