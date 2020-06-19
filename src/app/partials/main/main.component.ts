import { Component, OnInit } from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(public socket: Socket) {
    socket.emit('auth', {token: localStorage.getItem('access_token')});
  }

  ngOnInit(): void {}
}
