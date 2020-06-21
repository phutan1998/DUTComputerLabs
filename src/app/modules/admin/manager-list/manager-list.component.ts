import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/models/user';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { UserService } from 'src/app/core/services/user.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {

  public dataSource: MatTableDataSource<User>;
  public displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'email', 'actions'];

  private managers: User[];

  public pagination: Pagination;

  searchForm: FormGroup;

  name = '';

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.managers = data.managers.result;
      this.dataSource = new MatTableDataSource(this.managers);
      this.pagination = data.managers.pagination;
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
    this.userService.getUsers('MANAGER', this.name, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((result: PaginatedResult<User[]>) => {
          this.managers = result.result;
          this.pagination = result.pagination;
          this.dataSource = new MatTableDataSource(this.managers);
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
