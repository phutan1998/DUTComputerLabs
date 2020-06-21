import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  bookingId: number;
}

@Component({
  selector: 'app-notification-add',
  templateUrl: './notification-add.component.html',
  styleUrls: ['./notification-add.component.css']
})
export class NotificationAddComponent implements OnInit {

  noticeForm: FormGroup;

  constructor(private notificationService: NotificationService, private alertify: AlertifyService,
              private dialogRef: MatDialogRef<NotificationAddComponent>,  @Inject(MAT_DIALOG_DATA) private dialogData: DialogData) { }

  ngOnInit() {
    this.noticeForm = new FormGroup({
      content: new FormControl()
    });
  }

  onSave() {
    const notice: any = {};
    notice.bookingId = this.dialogData.bookingId;
    notice.content = this.noticeForm.get('content').value;

    this.notificationService.addNotification(notice).subscribe(() => {
      this.alertify.success('Thông báo đã được gửi');
    });

    this.dialogRef.close();
  }

  onClear() {
    this.noticeForm.reset();
  }

}
