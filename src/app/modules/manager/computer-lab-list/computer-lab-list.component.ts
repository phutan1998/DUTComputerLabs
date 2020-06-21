import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComputerLab } from 'src/app/shared/models/computer-lab';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { ComputerLabService } from 'src/app/core/services/computer-lab.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-computer-lab-list',
  templateUrl: './computer-lab-list.component.html',
  styleUrls: ['./computer-lab-list.component.css']
})
export class ComputerLabListComponent implements OnInit {

  public dataSource: MatTableDataSource<ComputerLab>;
  public displayedColumns: string[] = ['id', 'name', 'condition', 'computers', 'damagedComputers', 'aircons', 'actions'];

  private labs: ComputerLab[];

  public pagination: Pagination;

  constructor(private labService: ComputerLabService, private alertify: AlertifyService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.labs = data.labs.result;
      this.dataSource = new MatTableDataSource(this.labs);
      this.pagination = data.labs.pagination;
    });
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadLabs();
  }

  public loadLabs(): void {
    this.labService.getComputerLabs(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((result: PaginatedResult<ComputerLab[]>) => {
          this.labs = result.result;
          this.pagination = result.pagination;
          this.dataSource = new MatTableDataSource(this.labs);
        });
  }

  public onDelete(id: number): void {
    this.alertify.confirm('Bạn có chắc chắn xóa phòng máy này?', () => {
      this.labService.deleteComputerLab(id).subscribe(() => {
        this.alertify.success('Xóa phòng máy thành công');
      });
    });
  }

}
