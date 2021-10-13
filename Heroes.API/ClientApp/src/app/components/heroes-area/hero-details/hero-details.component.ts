import { HeroDTO } from './../../../models/hero-dto';
import { HeroesService } from 'src/app/services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faArrowLeft, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  backIcon = faArrowLeft;
  heroIcon = faUserShield;

  heroIconColor: string;
  item: HeroDTO;
  private readonly id: string

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  async ngOnInit() {
    this.item = await this.heroesService.getById(this.id).toPromise();
    this.heroIconColor = this.colorService.SuitColorDTOToHex(this.item.suitColor);
  }
}
