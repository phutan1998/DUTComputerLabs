import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Notice } from 'src/app/shared/models/notification';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationAddComponent } from '../notification-add/notification-add.component';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  public dataSource: MatTableDataSource<Notice>;
  public displayedColumns: string[] = ['id', 'date', 'content', 'actions'];

  private notices: Notice[];

  public pagination: Pagination;

  constructor(private notificationService: NotificationService, private alertify: AlertifyService,
              private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.notices = data.notices.result;
      this.dataSource = new MatTableDataSource(this.notices);
      this.pagination = data.notices.pagination;
    });
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadLabs();
  }

  public loadLabs(): void {
    this.notificationService.getNotifications(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((result: PaginatedResult<Notice[]>) => {
          this.notices = result.result;
          this.pagination = result.pagination;
          this.dataSource = new MatTableDataSource(this.notices);
        });
  }

  public onDetail(id: number): void {

  }

  public onDelete(id: number): void {

  }

}
