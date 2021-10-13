import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() public message: string;

  ngOnInit(): void {
    if (this.message === null || this.message === undefined || this.message.trim() === "")
      this.message = "Loading ...";
  }

}
