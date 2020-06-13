import { Component, OnInit } from '@angular/core';
import { IMAGES } from '../../utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent implements OnInit {
  constructor(private router: Router) {}
  public imagePath: string = IMAGES;
  ngOnInit(): void {}
  public onRedirect() {
    this.router.navigate(['/auth']);
  }
}
