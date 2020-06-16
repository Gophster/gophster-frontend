import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import jwtDecode from 'jwt-decode';
import {Subscription} from 'rxjs';
import {NotificationsService} from '../../../services/notifications/notifications.service';
import {StateService} from '../../../services/state/state.service';

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

  constructor(private notificationsService: NotificationsService, private router: Router, private route: ActivatedRoute, public stateService: StateService) {

  }

  ngOnInit(): void {
    this.obj = jwtDecode(localStorage.getItem('access_token'));
    this.countNotifications();
    this.countNotificationSubscription = this.notificationsService.getNotifications().subscribe((response) => {
      this.stateService.NotificationsQuantity++;
    });
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
    this.router.navigate(['/notification']);
  }


  public countNotifications() {
    this.countNotificationSubscription = this.notificationsService.countNotifications().subscribe((response) => {
      this.stateService.NotificationsQuantity = response.count;
    });
  }
}
