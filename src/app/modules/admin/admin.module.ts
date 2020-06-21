import { NgModule } from '@angular/core';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { LecturerListComponent } from './lecturer-list/lecturer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
    declarations: [
        ManagerListComponent,
        LecturerListComponent,
        UserEditComponent
    ],
    imports: [
        SharedModule,
        CoreModule,
        MaterialModule,

        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AlertModule.forRoot(),
        PaginationModule.forRoot(),
        RouterModule
    ],
    exports: [
        ManagerListComponent,
        LecturerListComponent,
        UserEditComponent
    ]
})
export class AdminModule {

}
