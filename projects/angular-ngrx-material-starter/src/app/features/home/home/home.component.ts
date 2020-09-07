import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoginForm: boolean;

  constructor() {}

  ngOnInit() {}

  public formType($event): void {
    this.isLoginForm = $event;
  }
}
