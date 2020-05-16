import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user/user.service';
import jwtDecode from 'jwt-decode';

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

  constructor(private userService: UserService) { }

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
        console.log(response);
        this.usersSuggestions = response;
        for (const obj in this.usersSuggestions) {
          this.usersSuggestions[obj].followButton = true;
        }
        // this.user = response;
        // // this.obj.handle = response.handle;
        // this.obj.name = this.user.name;
        // this.obj.location = this.user.location;
        // this.obj.avatar = this.user.avatar;
        // this.birthDate = this.user.birthdate
        //   ? this.user.birthdate.split('T')[0]
        //   : null;
      });
  }

  public onFollow(item: any) {
    const sendHandle = { handle : item.handle};
    this.followUserSubscription = this.userService.followUser(sendHandle).subscribe((response) => {
      this.getUsersData();
      item.followButton = false;
      // this.isFollowing();
    });
  }

  public onUnfollow(item: any) {
    const sendHandle = { handle : item.handle};
    this.unfollowUserSubscription = this.userService.unfollowUser(sendHandle).subscribe((response) => {
      item.followButton = true;
      // this.isFollowing();
    });
  }

  // public isFollowing() {
  //   const sendHandle = { handle : this.user.handle};
  //   this.isFollowingSubscription = this.userService.isFollowing(sendHandle).subscribe((response) => {
  //     this.followButton = response.data;
  //   });
  // }

}
