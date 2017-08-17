import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-error',
  templateUrl: './icon-error.component.html',
  styleUrls: ['./icon-error.component.css']
})
export class IconErrorComponent implements OnInit {

  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}