import {Component, OnDestroy, OnInit} from '@angular/core';
import jwtDecode from 'jwt-decode';
import {UserService} from '../../../services/user/user.service';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {GophsService} from '../../../services/gophs/gophs.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public queryParams = {
    currentPage: 2,
    totalPages: null
  };
  public posts = [];
  public user: {
    name: string;
    avatar: string|any;
    birthdate: string;
    location: string;
    fileName: string;
  } = { name: '',
    avatar: null,
    fileName: '',
    birthdate: '',
    location: ''};
  public obj: {
    name: string;
    avatar: string|any;
    birthdate: string;
    location: string;
    fileName: string;
  } = { name: '',
    avatar: null,
    fileName: '',
    birthdate: '',
    location: ''};
  public birthDate: string;
  public handle: string;


  constructor(private userService: UserService, private gophsService: GophsService, private route: ActivatedRoute) {}

  private getUserDataSubscription: Subscription;
  private getProfileGophsSubscription: Subscription;
  private postUserDataSubscription: Subscription;
  private getGophsSubscription: Subscription;

  ngOnInit(): void {
    this.handle = jwtDecode(localStorage.getItem('access_token')).handle;
    // this.birthDate = this.obj.birthdate.split('T')[0];
    const routeParam = this.route.snapshot.params['id'];
    if (routeParam) {
      this.getUserData(routeParam);
      console.log(this.user)
    } else {
      console.log(this.handle);
      this.getUserData(this.handle);
    }
    this.getGophs();
  }

  ngOnDestroy(): void {
    if (this.getUserDataSubscription) {
      this.getUserDataSubscription.unsubscribe();
    }
    if (this.getProfileGophsSubscription) {
      this.getProfileGophsSubscription.unsubscribe();
    }
  }

  public getUserData(handle: any) {
    this.getUserDataSubscription = this.userService.getUserData(handle).subscribe((response) => {
      this.user = response;
      this.handle = response.handle;
      this.obj.name = this.user.name;
      this.obj.location = this.user.location;
      this.obj.avatar = this.user.avatar;
      this.birthDate = this.user.birthdate ? this.user.birthdate.split('T')[0] : null;
    });
  }

  public sendData() {
    this.postUserDataSubscription = this.userService.postUserData(this.obj).subscribe((response) => {
      console.log(response);
      this.getUserData(this.handle);
      Swal.fire({
        title: '',
        text: 'The Profile has been successfully updated',
        icon: 'success',
        confirmButtonColor: 'rgb(171, 119, 75)',
        timer: 3000,
      });
      window.$('#profileEdit').modal('hide');
    });
  }

  public fileChange(file) {
    this.obj.avatar = file.target.files[0];
    this.obj.fileName = file.target.files[0].name;
  }

  public onDateChoose(date) {
    let myDate = date.target.value;
    myDate = myDate.split('-');
    this.obj.birthdate = new Date(myDate[0], myDate[2], myDate[1]).toISOString();
    this.birthDate = this.obj.birthdate.split('T')[0];
  }

  public getGophs(params?: any) {
    this.getGophsSubscription = this.gophsService.getGoph(params).subscribe((response) => {
      this.posts.push(... response.items);
      this.queryParams.totalPages = response.meta.totalPages;
      console.log(this.posts);
      // this.queryParams.next = response.links.next.substr(response.links.next.indexOf('?'), response.links.next.length);
      // this.queryParams.last = response.links.last.substr(response.links.last.indexOf('?'), response.links.last.length);

    });
  }

  public getProfileGoph(handle, params?: any) {
    this.getProfileGophsSubscription = this.gophsService.getProfileGoph(handle, params).subscribe((response) => {
    this.posts.push(... response.items);
    this.queryParams.totalPages = response.meta.totalPages;
    console.log(this.posts);
    // this.queryParams.next = response.links.next.substr(response.links.next.indexOf('?'), response.links.next.length);
    // this.queryParams.last = response.links.last.substr(response.links.last.indexOf('?'), response.links.last.length);

  });
  }

  public onScroll() {
    history.scrollRestoration = 'manual';
    if (this.queryParams.currentPage <= this.queryParams.totalPages) {
      this.getGophs(`?page=${this.queryParams.currentPage}`);
      this.queryParams.currentPage++;
    }
  }
}
