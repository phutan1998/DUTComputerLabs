import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './shared/components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { ComputerLabListComponent } from './modules/manager/computer-lab-list/computer-lab-list.component';
import { ComputerLabListResolver } from './core/resolvers/computer-lab-list.resolver';
import { ComputerLabEditComponent } from './modules/manager/computer-lab-edit/computer-lab-edit.component';
import { ComputerLabResolver } from './core/resolvers/computer-lab.resolver';
import { BookingListComponent } from './modules/manager/booking-list/booking-list.component';
import { BookingListResolver } from './core/resolvers/booking-list.resolver';
import { HomeComponent } from './shared/components/home/home.component';
import { ManagerListComponent } from './modules/admin/manager-list/manager-list.component';
import { LecturerListComponent } from './modules/admin/lecturer-list/lecturer-list.component';
import { ManagerListResolver } from './core/resolvers/manager-list.resolver';
import { LecturerListResolver } from './core/resolvers/lecturer-list.resolver';
import { UserEditComponent } from './modules/admin/user-edit/user-edit.component';
import { UserResolver } from './core/resolvers/user.resolver';
import { NotificationListComponent } from './modules/manager/notification-list/notification-list.component';
import { NotificationListResolver } from './core/resolvers/notification-list.resolver';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'profile', component: EditProfileComponent
  },
  {
    path: 'password', component: ChangePasswordComponent
  },
  {
    path: 'labs', component: ComputerLabListComponent, resolve: {labs: ComputerLabListResolver},
  },
  {
    path: 'labs/new', component: ComputerLabEditComponent
  },
  {
    path: 'labs/:id', component: ComputerLabEditComponent, resolve: {lab: ComputerLabResolver}
  },
  {
    path: 'notices', component: NotificationListComponent, resolve: {notices: NotificationListResolver}
  },
  {
    path: 'bookings', component: BookingListComponent, resolve: {bookings: BookingListResolver}
  },
  {
    path: 'managers', component: ManagerListComponent, resolve: {managers: ManagerListResolver}
  },
  {
    path: 'users/new', component: UserEditComponent
  },
  {
    path: 'users/:id', component: UserEditComponent, resolve: {user: UserResolver}
  },
  {
    path: 'lecturers', component: LecturerListComponent, resolve: {lecturers: LecturerListResolver}
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
