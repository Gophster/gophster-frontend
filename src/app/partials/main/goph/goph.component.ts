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
  public obj: any = {};
  public editMode = false;
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

  public  getGoph(gophId: any) {
    this.getGophSubscription = this.gophsService.getGoph(gophId).subscribe((response) => {
      this.goph = response;
    });
  }

}
