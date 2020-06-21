import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  onLogout(): void {
    this.authService.logout();
    this.alertify.message('Đã đăng xuất');
    this.router.navigate(['/home']);
  }

  toProfile(): void {
    this.router.navigate(['/profile']);
  }

  toEditPassword(): void {
    this.router.navigate(['/password']);
  }

}
