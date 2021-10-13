import { ColorService } from 'src/app/services/color.service';
import { AddHeroRequestDTO } from './../../../models/add-hero-request-dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
import { NotifyService } from 'src/app/services/notify.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnInit {
  backIcon = faArrowLeft;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    private router: Router,
    private notifyService: NotifyService,
    private colorService: ColorService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.form.addControl('name', new FormControl('', [Validators.required]));
    this.form.addControl('ability', new FormControl('', [Validators.required]));
    this.form.addControl('suitColor', new FormControl('', [Validators.required]));
    this.form.addControl('startingPower', new FormControl('0.01', [Validators.required, Validators.min(0.01)]));
  }

  async submit() {
    if (!this.form.valid) return;

    let newItem: AddHeroRequestDTO = {
      ability: this.form.value["ability"],
      startingPower: this.form.value["startingPower"],
      suitColor: this.colorService.hexToSuitColorDTO(this.form.value["suitColor"]),
      name: this.form.value["name"],
    };

    let response = await this.heroesService.addNewItem(newItem).toPromise();
    if (response != null) {
      this.router.navigateByUrl('/heroes');
      this.notifyService.success("A new hero has been added");
    }

  }
}
