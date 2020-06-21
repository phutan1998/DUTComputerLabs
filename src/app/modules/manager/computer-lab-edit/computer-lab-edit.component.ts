import { Component, OnInit } from '@angular/core';
import { ComputerLabService } from 'src/app/core/services/computer-lab.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ComputerLab } from 'src/app/shared/models/computer-lab';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-computer-lab-edit',
  templateUrl: './computer-lab-edit.component.html',
  styleUrls: ['./computer-lab-edit.component.css']
})
export class ComputerLabEditComponent implements OnInit {

  lab: ComputerLab;
  id: number;
  editMode = false;
  labForm: FormGroup;

  constructor(private labService: ComputerLabService, private alertify: AlertifyService,
              private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.lab = data.lab;
      if (this.lab) {
        this.editMode = true;
      }
    });

    this.initForm();
  }

  private initForm(): void {
    let name = '';
    let condition = '';
    let computers = 0;
    let damagedComputers = 0;
    let aircons = 0;

    if (this.editMode) {
      name = this.lab.name;
      condition = this.lab.condition;
      computers = this.lab.computers;
      damagedComputers = this.lab.damagedComputers;
      aircons = this.lab.aircons;
    }

    this.labForm = this.fb.group({
      name: [name, Validators.required],
      condition: [condition, Validators.required],
      computers: [computers, Validators.required],
      damagedComputers: [damagedComputers, Validators.required],
      aircons: [aircons, Validators.required]
    });
  }

  public onSave(): void {
    const lab: ComputerLab = Object.assign({}, this.labForm.value);

    if (this.editMode) {
      this.labService.updateComputerLab(this.lab.id, lab).subscribe((result: ComputerLab) => {
        this.alertify.success(`Chỉnh sửa thông tin phòng ${result.name} thành công`);
        this.router.navigate(['/labs']);
      });
    } else {
      this.labService.addComputerLab(lab).subscribe((result: ComputerLab) => {
        this.alertify.success(`Thêm phòng máy ${result.name} thành công`);
        this.router.navigate(['/labs']);
      });
    }
  }

  public onClear(): void {
    this.labForm.reset(this.lab);
  }

}
