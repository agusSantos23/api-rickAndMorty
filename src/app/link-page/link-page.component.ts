import { Component, inject, Input, OnInit } from '@angular/core';
import { ApiRickAndMortyService } from '../api-rick-and-morty.service';

export interface Info {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}

@Component({
  selector: 'app-link-page',
  templateUrl: './link-page.component.html',
  styleUrls: ['./link-page.component.scss'],
})
export class LinkPageComponent  implements OnInit {
  private apiService = inject(ApiRickAndMortyService);

  infoPages!: Info;
  urlPaginate!: string;
  numPageNow: number = 1;

  @Input() typeData!: "character" | "location";

  

  ngOnInit() {
   this.changePage()

   switch (this.typeData) {
    case "character":
      this.urlPaginate = "https://rickandmortyapi.com/api/character?page="
      break;
   
    default:
      break;
   }
  }

  changePage(url?: string, operation?: string){
    
    this.apiService.refreshData(url, operation);

    this.apiService.getInfoPages().subscribe(data => {
      this.infoPages = data;
    });

    this.apiService.getNumPage().subscribe(data => {
      this.numPageNow = data;
    })

  }

}
