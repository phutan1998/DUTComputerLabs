import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/shared/models/faculty';
import { UserForInsert } from 'src/app/shared/models/userForInsert';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  id: number;
  editMode = false;
  userForm: FormGroup;

  faculties: Faculty[];

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
      if (this.user) {
        this.editMode = true;
      }
    });

    this.userService.getFaculties().subscribe((result: Faculty[]) => {
      this.faculties = result;
    });

    this.initForm();
  }

  private initForm(): void {
    let name = '';
    let birthday = new Date();
    let gender = null;
    let faculty = null;
    let phoneNumber = '';
    let email = '';
    let address = '';
    let username = '';
    let role = '';
    const password = '';

    if (this.editMode) {
      name = this.user.name;
      birthday = this.user.birthday;
      gender = this.user.gender;
      faculty = this.user.faculty;
      phoneNumber = this.user.phoneNumber;
      email = this.user.email;
      address = this.user.address;
      username = this.user.username;
      role = this.user.role;
    }

    this.userForm = this.fb.group({
      name: [name, Validators.required],
      birthday: [birthday, Validators.required],
      gender: [gender, Validators.required],
      faculty: [faculty, Validators.required],
      phoneNumber: [phoneNumber, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      address: [address],
      username: [username, Validators.required],
      password: [password],
      role: [role, Validators.required]
    });
  }

  public onSave(): void {
    const user: UserForInsert = Object.assign({}, this.userForm.value);

    user.faculty = this.faculties.find(f => f.name === this.userForm.get('faculty').value);
    user.gender = (this.userForm.get('gender').value === 'Nam') ? false : true;
    user.birthday = this.convertDate(user.birthday);

    if (this.editMode) {
      this.userService.updateUser(this.user.id, user).subscribe((result: User) => {
        this.alertify.success(`Chỉnh sửa thông tin người dùng ${result.name} thành công`);
        this.router.navigate(['/managers']);
      });
    } else {
      this.userService.addUser(user).subscribe((result: User) => {
        this.alertify.success(`Thêm người dùng ${result.name} thành công`);
        this.router.navigate(['/managers']);
      });
    }
  }

  public onClear(): void {
    this.userForm.reset(this.user);
  }

  private convertDate(s: string): string {
    const d = new Date(s);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();

    const month = (m < 10) ? `0${m}` : `${m}`;
    const date = (day < 10) ? `0${day}` : `${day}`;

    const result = y + '-' + month + '-' + date + 'T00:00:00';

    return result;
  }

}
