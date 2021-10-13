import { HeroDTO } from './../../../models/hero-dto';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: HeroDTO[] = null;

  addIcon = faPlus;

  constructor(
    private heroService: HeroesService
  ) { }

  async ngOnInit() {
    this.heroes = await this.heroService.getAll().toPromise();
  }

}
