import { Component, Input, OnInit } from '@angular/core';

export interface Info {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
  nowNumber: number;
}


@Component({
  selector: 'app-link-page',
  templateUrl: './link-page.component.html',
  styleUrls: ['./link-page.component.scss'],
})
export class LinkPageComponent  implements OnInit {
  @Input() typeData!: "character" | "location";
  @Input() infoPages!: Info;

  
  constructor() {}

  ngOnInit() {}

}
