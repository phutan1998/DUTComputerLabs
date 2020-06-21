import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DUT Computer Labs';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
    }
  }
}
