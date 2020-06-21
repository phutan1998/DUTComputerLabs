import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  currentUser: User;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    const user = Object.assign({}, this.loginForm.value);
    this.authService.login(user)
      .subscribe(next => {
          this.currentUser = this.authService.currentUser;

          if (this.currentUser.role === 'MANAGER') {
            this.router.navigate(['/labs']);
          } else {
            this.router.navigate(['/managers']);
          }

          this.alertify.success('Đăng nhập thành công');
      });
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

}
