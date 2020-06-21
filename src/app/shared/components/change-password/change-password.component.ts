import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentUser: User;

  passwordForm: FormGroup;

  passwordForInsert: any = {};

  constructor(private userService: UserService, private authService: AuthService,
              private fb: FormBuilder, private alertify: AlertifyService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.initForm();
  }

  private initForm() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirm: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value === g.get('confirm').value ? null : { mismatch: true };
  }

  public onSave() {
    this.passwordForInsert.oldPassword = this.passwordForm.get('oldPassword').value;
    this.passwordForInsert.newPassword = this.passwordForm.get('newPassword').value;

    this.userService.updatePassword(this.currentUser.id, this.passwordForInsert).subscribe(() => {
      this.alertify.success('Update password successfully');

    }, error => {
      this.alertify.error(error);
    });
  }

  public onClear() {
    this.passwordForm.reset();
  }

}
