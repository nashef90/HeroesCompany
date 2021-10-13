import { UpdateHeroRequestDTO } from './../models/update-hero-request-dto';
import { AddHeroRequestDTO } from './../models/add-hero-request-dto';
import { HeroDTO } from './../models/hero-dto';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroes: HeroDTO[] = null;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  private heroSort(a: HeroDTO, b: HeroDTO) {
    return b.currentPower - a.currentPower;
  }

  getAll(): Observable<HeroDTO[]> {
    if (this.heroes)
      return of(this.heroes);

    return this.http.get<HeroDTO[]>(this.baseUrl + "Heroes")
      .pipe(
        tap(data => {
          this.heroes = data.sort((a, b) => this.heroSort(a, b));
        }));
  }

  getById(id: string): Observable<HeroDTO> {
    if (this.heroes) {
      const index = this.heroes.findIndex(i => i.id === id);
      if (index >= 0)
        return of(this.heroes[index]);
    }
    return this.http.get<HeroDTO>(this.baseUrl + "Heroes/" + id);
  }

  addNewItem(item: AddHeroRequestDTO): Observable<HeroDTO> {
    return this.http.post<HeroDTO>(this.baseUrl + "Heroes", item)
      .pipe(
        tap(data => {
          if (!this.heroes)
            return;

          this.heroes.push(data);
          this.heroes = this.heroes.sort((a, b) => this.heroSort(a, b));
        }));
  }

  updateItem(item: UpdateHeroRequestDTO): Observable<HeroDTO> {
    return this.http.put<HeroDTO>(this.baseUrl + "Heroes/" + item.id, item)
      .pipe(
        tap(data => {
          if (!this.heroes)
            return;
          const index = this.heroes.findIndex(i => i.id === data.id);
          if (index >= 0)
            this.heroes[index] = data;
          else
            this.heroes.push(data);
          this.heroes = this.heroes.sort((a, b) => this.heroSort(a, b));
        }));
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "Heroes/" + id)
      .pipe(
        tap(data => {
          if (!this.heroes)
            return;

          const index = this.heroes.findIndex(i => i.id === id);
          if (index >= 0)
            this.heroes.slice(index, 1);
        }));
  }

  startTraining(id: string): Observable<HeroDTO> {
    return this.http.post<HeroDTO>(this.baseUrl + "Heroes/StartTraining/" + id, null)
      .pipe(
        tap(data => {
          if (!this.heroes)
            return;

          const index = this.heroes.findIndex(i => i.id === data.id);
          if (index >= 0)
            this.heroes[index] = data;
          else
            this.heroes.push(data);
          this.heroes = this.heroes.sort((a, b) => this.heroSort(a, b));
        }));
  }
}
