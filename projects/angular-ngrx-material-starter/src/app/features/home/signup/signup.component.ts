import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService
} from '../../../core/core.module';
import { UserService } from '../../../core/data-access/data/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'anms-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  signupForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifService: NotificationService
  ) {}

  @Output() formType = new EventEmitter<boolean>();

  ngOnInit() {
    this.createForm();
    this.userService.test().then(
      (el) => {
        console.log(el);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public createForm(): void {
    this.signupForm = this.formBuilder.group({
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

  public onSubmit(): void {
    const user = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value
    };
    this.userService
      .register(user)
      .then((el) => {
        // signup
      })
      .catch((err) => {
        this.notifService.error(err.error.msg);
      });
  }

  public switchForm(): void {
    this.formType.emit(true);
  }
}
