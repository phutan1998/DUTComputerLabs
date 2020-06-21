import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        EditProfileComponent,
        ChangePasswordComponent,
        HomeComponent
    ],
    imports: [
        CoreModule,
        MaterialModule,

        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        EditProfileComponent,
        ChangePasswordComponent,
        HomeComponent
    ]
})
export class SharedModule {

}
