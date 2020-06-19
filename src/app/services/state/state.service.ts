import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
  public registrired = false;
  public NotificationsQuantity = 0;
  public MessagesQuantity = 0;
  public token: string;
}
