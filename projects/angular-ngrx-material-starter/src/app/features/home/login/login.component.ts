import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/data-access/data/user.service';

@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  loginForm: FormGroup;

  @Output() formType = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  public switchForm(): void {
    this.formType.emit(false);
  }

  public onSubmit() {
    const user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.userService
      .login(user)
      .then((el) => {
        // login
      })
      .catch((err) => {
        //this.notifService.error(err.error.msg);
        console.log(err);
      });
  }

  public createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
          )
        ])
      ],
      password: ['', Validators.required]
    });
  }
}
