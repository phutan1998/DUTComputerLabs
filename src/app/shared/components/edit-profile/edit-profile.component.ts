import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Faculty } from '../../models/faculty';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { UserForInsert } from '../../models/userForInsert';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  currentUser: User;

  faculties: Faculty[];

  constructor(private authService: AuthService, private userService: UserService,
              private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;

    this.userService.getFaculties().subscribe((result: Faculty[]) => {
      this.faculties = result;
    });

    this.initForm();
  }

  private initForm() {
    this.profileForm = this.fb.group({
      name: [this.currentUser.name, Validators.required],
      birthday: [this.currentUser.birthday, Validators.required],
      gender: [this.currentUser.gender, Validators.required],
      faculty: [this.currentUser.faculty, Validators.required],
      phoneNumber: [this.currentUser.phoneNumber, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      address: [this.currentUser.address],
      username: [this.currentUser.username, Validators.required],
    });
  }

  public onSave() {
    const user: UserForInsert = Object.assign({}, this.profileForm.value);

    user.faculty = this.faculties.find(f => f.name === this.profileForm.get('faculty').value);
    user.gender = (this.profileForm.get('gender').value === 'Nam') ? false : true;

    this.userService.updateProfile(this.currentUser.id, user).subscribe((result: User) => {
      this.currentUser = result;
      this.initForm();
      this.alertify.success('Cập nhật thông tin cá nhân thành công');
    });

  }

  public onClear() {
    this.profileForm.reset(this.currentUser);
  }

}
