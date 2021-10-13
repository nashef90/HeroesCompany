import { UpdateHeroRequestDTO } from './../../../models/update-hero-request-dto';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
import { NotifyService } from 'src/app/services/notify.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {
  backIcon = faArrowLeft;
  form: FormGroup;
  private readonly id: string

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.form.addControl('name', new FormControl('', [Validators.required]));
    this.form.addControl('ability', new FormControl('', [Validators.required]));
    this.form.addControl('suitColor', new FormControl('', [Validators.required]));

    this.setItemData();
  }

  async setItemData() {
    const item = await this.heroesService.getById(this.id).toPromise();
    const hexColor = this.colorService.SuitColorDTOToHex(item.suitColor);
    this.form.patchValue({
      name: item.name,
      ability: item.ability,
      suitColor: hexColor
    });
  }

  async submit() {
    if (!this.form.valid) return;

    let newItem: UpdateHeroRequestDTO = {
      id: this.id,
      ability: this.form.value["ability"],
      suitColor: this.colorService.hexToSuitColorDTO(this.form.value["suitColor"]),
      name: this.form.value["name"],
    };

    let response = await this.heroesService.updateItem(newItem).toPromise();
    if (response != null) {
      this.router.navigateByUrl('/heroes');
      this.notifyService.success("A hero item has been updated");
    }

  }
}
