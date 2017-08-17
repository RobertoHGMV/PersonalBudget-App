import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public classNotification: string;
  public messages: string;
  @Input() show: boolean;

  constructor() { }

  ngOnInit() {
  }

  showNotification(classNot: string, msgs: string) {
    this.classNotification = classNot;
    this.messages = msgs;
    this.show = true;
    console.log(classNot, msgs, this.show);
  }

  closeNotification() {
    this.show = false;
    this.messages = '';
    console.log(this.show);
  }
}
