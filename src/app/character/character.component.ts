import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

interface Characcter {
  id: number,
  name: string,
  status: string,
  gender: string,
  image: string,
  url: string,
  origin: {
    name: string
  }
}


@Component({
  selector: 'app-character',
  standalone: true,
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],
})
export class CharacterComponent implements OnInit {
  @Input() characterData!: Characcter

  constructor() { 

  }

  ngOnInit() {
  }

}
