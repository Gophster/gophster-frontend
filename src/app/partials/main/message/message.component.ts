import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {Subscription} from 'rxjs';
import {MessagesService} from '../../../services/messages/messages.service';
import {Socket} from 'ngx-socket-io';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy, AfterViewChecked {
  public conversationUsers: any = [];
  public conversations: any = [];
  public activeUser: any = null;
  public handle: string;
  public message: string;
  public currentUser;
  @ViewChild('conversationDiv') private conversationDiv: ElementRef;

  private getUserDataSubscription: Subscription;
  private getMessagesSubscription: Subscription;
  private sendMessagesSubscription: Subscription;
  private getUsersSubscription: Subscription;
  private getMessagesLiveSubscription: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService, private messagesService: MessagesService, public socket: Socket) { }

  ngOnInit(): void {
    this.currentUser = jwtDecode(localStorage.getItem('access_token'));
    this.getUsers();

    this.route.queryParams.subscribe((params) => {
      if (params.handle) {
        setTimeout(() => {
          this.handle = params.handle;
          this.getUserData(params.handle);
        }, 100);
      }
    });
    this.getLiveMessages();
  }

  ngOnDestroy(): void {
    if (this.getUserDataSubscription) {
      this.getUserDataSubscription.unsubscribe();
    }
    if (this.getMessagesSubscription) {
      this.getMessagesSubscription.unsubscribe();
    }
    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }
    if (this.getMessagesLiveSubscription) {
      this.getMessagesLiveSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public getUserData(handle) {
    this.getUserDataSubscription = this.userService.getUserData(handle).subscribe((response) => {
      const exists = this.conversationUsers.filter(item => item.id == response.id);
      if (exists.length === 0) {
        this.conversationUsers.unshift(response);
      }
      this.selectActiveUser(response);
    });
  }

  public onMessageSend() {
    this.socket.emit('message', {token: localStorage.getItem('access_token'), to: this.activeUser.id, message: this.message}, (data) => {
      this.conversations[this.activeUser.id].items.push(data);
    });
    this.message = '';
  }

  public selectActiveUser(item) {
    if (item) {
      this.activeUser = item;
      this.getMessagesSubscription = this.messagesService.getMessages(item.id).subscribe((response) => {
        response.items = response.items.reverse();
        this.conversations[item.id] = response;
      });
    }
  }

  public getUsers() {
    this.getUserDataSubscription = this.messagesService.getUsers().subscribe((response) => {
      this.selectActiveUser(response.items[0]);
      this.conversationUsers.push(... response.items);
    });
  }

  public getLiveMessages() {
    this.getMessagesLiveSubscription = this.messagesService.getMessagesLive().subscribe((response: any) => {
      if (!this.conversationUsers.find((item: any) => {
        return item.id == response.author.id;
      })) {
        this.conversationUsers.unshift(response.author);
        this.selectActiveUser(response.author);
        this.conversations[response.author.id] = { items: [response] };
      } else {
        this.conversations[response.author.id].items.push(response);
      }
    });
  }

  public scrollToBottom(): void {
    try {
      this.conversationDiv.nativeElement.scrollTop = this.conversationDiv.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

}
