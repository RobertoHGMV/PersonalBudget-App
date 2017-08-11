import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public user: string = '';

  constructor() {
    let data: any = JSON.parse(localStorage.getItem('pb.user'));
    if (data) {
      this.user = data.name;
    }
  }

  ngOnInit() {
  }

}
