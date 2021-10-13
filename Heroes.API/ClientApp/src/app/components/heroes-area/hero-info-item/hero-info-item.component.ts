import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-info-item',
  templateUrl: './hero-info-item.component.html',
  styleUrls: ['./hero-info-item.component.scss']
})
export class HeroInfoItemComponent {
  @Input() title: string;
  @Input() value: string;

}
