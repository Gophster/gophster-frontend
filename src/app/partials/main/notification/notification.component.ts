import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationsService} from '../../../services/notifications/notifications.service';
import {Router} from '@angular/router';
import {StateService} from '../../../services/state/state.service';
import set = Reflect.set;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  public notifications = [];
  public queryParams = {
    currentPage: 2,
    totalPages: null
  };

  private getNotificationsSubscription: Subscription;
  private readAllNotificationSubscription: Subscription;
  private notSubscription: Subscription;

  constructor(private notificationsService: NotificationsService, public stateService: StateService, public router: Router) {
  }

  ngOnInit(): void {
    this.getNotifications();
    this.readAllNotification();
    this.notSubscription = this.notificationsService.getNotifications().subscribe((response) => {
      // @ts-ignore
      this.notifications.unshift(response.data);
      this.readAllNotification();
    });
  }

  ngOnDestroy(): void {
    if (this.getNotificationsSubscription) {
      this.getNotificationsSubscription.unsubscribe();
    }
    if (this.readAllNotificationSubscription) {
      this.readAllNotificationSubscription.unsubscribe();
    }
    if (this.notSubscription) {
      this.notSubscription.unsubscribe();
    }
  }

  public getNotifications(params?: any) {
    this.getNotificationsSubscription = this.notificationsService.getNotification(params).subscribe((response) => {
      if (params) {
        this.notifications.push(... response.items);
      } else {
        this.notifications = response.items;
      }
      this.queryParams.totalPages = response.meta.totalPages;
    });
  }

  public onNotificationClick(link: string) {
    this.router.navigate([`${link}`]);
  }

  public readAllNotification() {
    this.readAllNotificationSubscription = this.notificationsService.readAllNotifications().subscribe((response) => {
      setTimeout(() => {
        this.getNotifications();
      }, 500);
      setTimeout(() => {
        this.stateService.NotificationsQuantity = 0;
      }, 500);
    });
  }

  onScroll() {
    history.scrollRestoration = 'manual';
    if (this.queryParams.currentPage <= this.queryParams.totalPages) {
      this.getNotifications(`?page=${this.queryParams.currentPage}`);
      this.queryParams.currentPage++;
    }
  }


}
