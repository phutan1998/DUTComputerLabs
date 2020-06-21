import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/models/user';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { UserService } from 'src/app/core/services/user.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrls: ['./lecturer-list.component.css']
})
export class LecturerListComponent implements OnInit {

  public dataSource: MatTableDataSource<User>;
  public displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'email', 'actions'];

  private lecturers: User[];

  public pagination: Pagination;

  searchForm: FormGroup;

  name = '';

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.lecturers = data.lecturers.result;
      this.dataSource = new MatTableDataSource(this.lecturers);
      this.pagination = data.lecturers.pagination;
    });

    this.searchForm = new FormGroup({
      name: new FormControl()
    });
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadManagers();
  }

  public loadManagers(): void {
    this.userService.getUsers('LECTURER', this.name, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((result: PaginatedResult<User[]>) => {
          this.lecturers = result.result;
          this.pagination = result.pagination;
          this.dataSource = new MatTableDataSource(this.lecturers);
        });
  }

  public onSearch(): void {
    this.name = this.searchForm.get('name').value;
    this.loadManagers();
  }

  public onDelete(id: number): void {
    this.alertify.confirm('Bạn có chắc chắn xóa người dùng này?', () => {
      this.userService.deleteUser(id).subscribe(() => {
        this.alertify.success('Xóa người dùng thành công');
      });
    });
  }


}
