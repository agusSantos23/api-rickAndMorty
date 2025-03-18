import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterComponent } from "../character/character.component";
import { Info, LinkPageComponent } from "../link-page/link-page.component";
import { ApiRickAndMortyService } from '../api-rick-and-morty.service';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, CharacterComponent, LinkPageComponent],
})
export class CharactersPage implements OnInit {

  private apiService = inject(ApiRickAndMortyService)

  protected charactersData!: any[];
  public infoPages!: Info;


  ngOnInit() {
    this.apiService.refreshData();

    this.apiService.charactersData$.subscribe(data => {
      this.charactersData = data;
    });
  }

 

  
}
