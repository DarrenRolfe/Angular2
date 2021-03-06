import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class HeroService {
  
  private heroesUrl = 'http://localhost:3000/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      map(heroes => {
        console.log(`Returning getHeroes: ${heroes}`)
        return heroes
      })
    );
  }

  /* 
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
    .pipe(
      map(heroes => heroes[0]),
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  } */

  
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      map(hero => {
        console.log(hero)
        return hero
      })
    );
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, hero, httpOptions).pipe(
      map(hero => {
        console.log(hero)
        return hero
      })
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.name}`;

    return this.http.post<Hero>(url, hero, httpOptions).pipe(
       tap((hero: Hero) => this.log(`added hero with id=${hero.id}`)),
       catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term:string): Observable<Hero[]> {
    var url = `${this.heroesUrl}/search?term=${term}`; //${term}`;
    console.log(`searching heroes...`)
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(url).pipe(
      map(myhero => {
        console.log(`This is my hero: ${myhero}`)
        return myhero
      })
      // tap(_ => this.log(`found heroes matching "${term}"`)),
      // catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    console.log(result)
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
  

}
