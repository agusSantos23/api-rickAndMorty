import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRickAndMortyService {
  private location = inject(Location);

  private apiUrl:string = 'https://rickandmortyapi.com/api/character'; 

  private charactersData$ = new BehaviorSubject<any[]>([]);
  private infoPages$ = new BehaviorSubject<any>(null);
  private numPageNow$ = new BehaviorSubject<number>(1);

  constructor(private http: HttpClient) {}

  fetchData( url?: string): Observable<any> {
    return this.http.get<any>( url ?? this.apiUrl );
  }

  refreshData( url?: string, operation?: string): void {

    if (operation) {
      const currentPage = this.numPageNow$.getValue();
      let num;
      switch (operation) {
        case '+':
          num = currentPage + 1
          break;

        case '-':
          num = currentPage - 1
          break;

        case '++':
          num = currentPage + 2
          break;

        case '--':
          num = currentPage - 2
          break;
      
        default:
          num = currentPage;
          break;
      }

      this.numPageNow$.next(num);
    }
   

    this.fetchData(url).pipe(
      map(res => ({
        info: res.info,
        results: res.results
      })),
      tap(data => {
        this.charactersData$.next(data.results);
        this.infoPages$.next(data.info);
      })
    ).subscribe();
  }

  getCharacters(): Observable<any[]> {
    return this.charactersData$.asObservable();
  }

  getInfoPages(): Observable<any> {
    return this.infoPages$.asObservable();
  }

  getNumPage(): Observable<number> {
    return this.numPageNow$.asObservable();
  }
  

  private extractPageNumber(url: string): number {
    const pageMatch = url.match(/[?&]page=(\d+)/);
    return pageMatch ? parseInt(pageMatch[1], 10) : 1;
  }

}
