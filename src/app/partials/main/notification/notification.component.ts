import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationsService} from '../../../services/notifications/notifications.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  public notifications = [];

  private getNotificationsSubscription: Subscription;
  private readAllNotificationSubscription: Subscription;

  constructor(private notificationsService: NotificationsService, public router: Router) {
  }

  ngOnInit(): void {
    this.getNotifications();
    setTimeout(() => {
      this.readAllNotification();
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.getNotificationsSubscription) {
      this.getNotificationsSubscription.unsubscribe();
    }
    if (this.readAllNotificationSubscription) {
      this.readAllNotificationSubscription.unsubscribe();
    }
  }

  public getNotifications() {
    this.getNotificationsSubscription = this.notificationsService.getNotification().subscribe((response) => {
      this.notifications = response.items;
      console.log(response);
    });
  }

  public onNotificationClick(link: string) {
    this.router.navigate([`${link}`]);
  }

  public readAllNotification() {
    this.readAllNotificationSubscription = this.notificationsService.readAllNotifications().subscribe((response) => {
      console.log(response);
    });
  }

}
