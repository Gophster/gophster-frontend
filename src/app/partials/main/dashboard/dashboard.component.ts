import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import jwtDecode from 'jwt-decode';
import {Subscription} from 'rxjs';
import {NotificationsService} from '../../../services/notifications/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public username = '';
  public obj: any = {};
  public NotificationsQuantity: number;


  private readAllNotificationSubscription: Subscription;
  private countNotificationSubscription: Subscription;

  constructor(private notificationsService: NotificationsService, private router: Router) {
  }

  ngOnInit(): void {
    this.obj = jwtDecode(localStorage.getItem('access_token'));
    this.countNotifications();
  }

  ngOnDestroy(): void {
    if (this.readAllNotificationSubscription) {
      this.readAllNotificationSubscription.unsubscribe();
    }
    if (this.countNotificationSubscription) {
      this.countNotificationSubscription.unsubscribe();
    }
  }

  public onLogOut() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  public onProfileRedirect() {
    this.router.navigate(['/user']);
  }

  public onHomeRedirect() {
    this.router.navigate(['']);
  }

  public onMessage() {
    this.router.navigate(['/message']);
  }

  public onNotification() {
    setTimeout(() => {
      this.readAllNotification();
    }, 2000);
    this.router.navigate(['/notification']);
  }

  public readAllNotification() {
    this.readAllNotificationSubscription = this.notificationsService.readAllNotifications().subscribe((response) => {
      this.NotificationsQuantity = 0;
    });
  }

  public countNotifications() {
    this.countNotificationSubscription = this.notificationsService.countNotifications().subscribe((response) => {
      this.NotificationsQuantity = response.count;
    });
  }
}
