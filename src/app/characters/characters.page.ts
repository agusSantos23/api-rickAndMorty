import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterComponent } from "../character/character.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Info, LinkPageComponent } from "../link-page/link-page.component";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, CharacterComponent, HttpClientModule, LinkPageComponent],
})
export class CharactersPage implements OnInit {
  protected charactersData!: any[];
  public infoPages!: Info;
  private urlApi: string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { 

  }

  ngOnInit() {    
    this.fetchData( this.urlApi );
  }

  fetchData(url: string) {
    this.http.get(url).subscribe((res: any) => {
      this.charactersData = res.results;       
      this.infoPages = {
        ...res.info,
        nowNumber: this.extractPageNumber(url)
      };
      console.log(this.infoPages)

    });
  }

  extractPageNumber(url: string): number {
    const pageMatch = url.match(/[?&]page=(\d+)/); 
    return pageMatch ? parseInt(pageMatch[1], 10) : 1; 
  }

}
