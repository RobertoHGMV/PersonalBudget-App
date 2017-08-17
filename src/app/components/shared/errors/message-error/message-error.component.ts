import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.css']
})
export class MessageErrorComponent implements OnInit {

  @Input() msgError: string;
  @Input() showError: boolean;

  constructor() { }

  ngOnInit() {
  }

}
