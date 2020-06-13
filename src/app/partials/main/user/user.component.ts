import { Component, OnDestroy, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserService } from '../../../services/user/user.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { GophsService } from '../../../services/gophs/gophs.service';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public queryParams = {
    currentPage: 2,
    totalPages: null,
  };
  public posts = [];
  public user: {
    handle: string;
    name: string;
    avatar: string | any;
    birthdate: string;
    location: string;
    fileName: string;
    followersAmount: number;
    followingAmount: number;
  } = { handle: '', name: '', avatar: null, fileName: '', birthdate: '', location: '', followersAmount: null, followingAmount: null };
  public obj: {
    handle: string;
    name: string;
    avatar: string | any;
    birthdate: string;
    location: string;
    fileName: string;
    followersAmount: number;
    followingAmount: number;
  } = { handle: '', name: '', avatar: null, fileName: '', birthdate: '', location: '', followersAmount: null, followingAmount: null,  };
  public followButton: boolean;
  public birthDate: string;
  public mainHandle: string;
  public routeParam: string;
  public editMode = false;

  constructor(
    private userService: UserService,
    private gophsService: GophsService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  private getUserDataSubscription: Subscription;
  private getProfileGophsSubscription: Subscription;
  private postUserDataSubscription: Subscription;
  private editGophSubscription: Subscription;
  private followUserSubscription: Subscription;
  private unfollowUserSubscription: Subscription;
  private isFollowingSubscription: Subscription;
  private deleteGophSubscription: Subscription;

  ngOnInit(): void {
    this.mainHandle = jwtDecode(localStorage.getItem('access_token')).handle;
    this.routeParam = this.route.snapshot.params.id;
    this.user.handle = this.routeParam;
    if (this.routeParam) {
      this.getUserData(this.routeParam);
      this.getProfileGoph(this.routeParam);
      this.isFollowing();
    } else {
      this.getUserData(this.mainHandle);
      this.getProfileGoph(this.mainHandle);
    }
  }

  ngOnDestroy(): void {
    if (this.getUserDataSubscription) {
      this.getUserDataSubscription.unsubscribe();
    }
    if (this.getProfileGophsSubscription) {
      this.getProfileGophsSubscription.unsubscribe();
    }
    if (this.postUserDataSubscription) {
      this.postUserDataSubscription.unsubscribe();
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
    if (this.deleteGophSubscription) {
      this.deleteGophSubscription.unsubscribe();
    }
    if (this.editGophSubscription) {
      this.editGophSubscription.unsubscribe();
    }
  }

  public getUserData(handle: any) {
    this.getUserDataSubscription = this.userService
      .getUserData(handle)
      .subscribe((response) => {
        this.user = response;
        // this.obj.handle = response.handle;
        this.obj.name = this.user.name;
        this.obj.location = this.user.location;
        this.obj.avatar = this.user.avatar;
        this.birthDate = this.user.birthdate
          ? this.user.birthdate.split('T')[0]
          : null;
      });
  }

  public sendData() {
    this.postUserDataSubscription = this.userService
      .postUserData(this.obj)
      .subscribe((response) => {
        this.getUserData(this.mainHandle);
        Swal.fire({
          title: '',
          text: 'The Profile has been successfully updated',
          icon: 'success',
          confirmButtonColor: 'rgb(171, 119, 75)',
          timer: 3000,
        });
        $('#profileEdit').modal('hide');
      });
  }

  public fileChange(file) {
    this.obj.avatar = file.target.files[0];
    this.obj.fileName = file.target.files[0].name;
  }

  public onDateChoose(date) {
    this.obj.birthdate = new Date(date).toISOString();
    this.birthDate = this.obj.birthdate.split('T')[0];
  }

  public getProfileGoph(handle, params?: any) {
    this.getProfileGophsSubscription = this.gophsService
      .getProfileGoph(handle, params)
      .subscribe((response) => {
        this.posts.push(...response.items);
        for (const item of this.posts) {
          item.editMode = false;
        }
        this.queryParams.totalPages = response.meta.totalPages;
      });
  }

  public onFollow() {
    const sendHandle = { handle : this.user.handle};
    this.followUserSubscription = this.userService.followUser(sendHandle).subscribe((response) => {
      this.getUserData(this.routeParam);
      this.isFollowing();
    });
  }

  public onUnfollow() {
    const sendHandle = { handle : this.user.handle};
    this.unfollowUserSubscription = this.userService.unfollowUser(sendHandle).subscribe((response) => {
      this.getUserData(this.routeParam);
      this.isFollowing();
    });
  }

  public isFollowing() {
    const sendHandle = { handle : this.user.handle};
    this.isFollowingSubscription = this.userService.isFollowing(sendHandle).subscribe((response) => {
      this.followButton = response.data;
    }, (error) => {
      this.router.navigate(['/404']);
    });
  }

  public deleteGoph(item: any) {
    this.deleteGophSubscription = this.gophsService.deleteGoph(item.id).subscribe((response) => {
      this.posts = this.posts.filter(goph => goph.id !== item.id);
      Swal.fire({
        title: '',
        text: 'The Goph has successfully been deleted',
        icon: 'success',
        confirmButtonColor: 'rgb(171, 119, 75)',
        timer: 3000,
      });
    });
  }

  public editGoph(index: number) {
    this.posts[index].editMode = true;
  }

  public onEditGoph(editedItem: any, index: number) {
    const sendObject = {
      text: editedItem.text
    };
    this.editGophSubscription = this.gophsService.editGoph(editedItem.id, sendObject).subscribe((response) => {
      const editedGoph = this.posts.find(item => item.id === response.id);
      editedGoph.text = response.text;
      this.cancelEditGoph(index);
      Swal.fire({
        title: '',
        text: 'The Goph has successfully updated',
        icon: 'success',
        confirmButtonColor: 'rgb(171, 119, 75)',
        timer: 3000,
      });
    });
  }

  public cancelEditGoph(index: number) {
    this.posts[index].editMode = false;
  }

  public onScroll() {
    history.scrollRestoration = 'manual';
    if (this.queryParams.currentPage <= this.queryParams.totalPages) {
      if (this.routeParam) {
        this.getProfileGoph(this.routeParam, `?page=${this.queryParams.currentPage}`);
      } else {
        this.getProfileGoph(this.mainHandle, `?page=${this.queryParams.currentPage}`);
      }
      this.queryParams.currentPage++;
    }
  }

}
