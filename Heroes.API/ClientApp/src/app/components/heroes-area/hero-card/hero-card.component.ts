import { ColorService } from 'src/app/services/color.service';
import { HeroDTO } from './../../../models/hero-dto';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlayCircle, faEdit, faEye, faRunning, faBolt, faPlay, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() item: HeroDTO;
  @Output() itemChange = new EventEmitter<HeroDTO>();

  heroIconColor: string;
  heroIcon = faUserShield;
  trainingIcon = faRunning;
  editHeroIcon = faEdit;
  heroDetailsIcon = faEye;
  powerIcon = faBolt;

  constructor(
    private heroService: HeroesService,
    private router: Router,
    private colorService: ColorService
  ) { }

  ngOnInit() {
    this.heroIconColor = this.colorService.SuitColorDTOToHex(this.item.suitColor);
  }

  async startTraining() {
    this.item = await this.heroService.startTraining(this.item.id).toPromise();
    this.itemChange.emit(this.item);
  }

  editHero() {
    this.router.navigateByUrl(`/heroes/edit/${this.item.id}`);
  }

  viewHero() {
    this.router.navigateByUrl(`/heroes/view/${this.item.id}`);
  }
}
