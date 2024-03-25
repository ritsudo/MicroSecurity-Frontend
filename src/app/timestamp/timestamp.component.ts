import { Component } from '@angular/core';
import { TimestampService } from '../timestamp.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-timestamp',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './timestamp.component.html',
  styleUrl: './timestamp.component.css'
})

export class TimestampComponent {
    timestampStrings: string[] = []
    buttonStatus: number = 0;
    currentDateTime: string = "";
    prevControllerDateTime: string = "";
    controllerDateTime: string = "";

    isErrorVisible: boolean = true;

    constructor(
      private timestampService: TimestampService,
      private datePipe: DatePipe
    ) {}

    updateDateTime() {
      this.currentDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') || '';
      this.timestampService.getTimestamp().subscribe(timestamp => {
          this.controllerDateTime = this.datePipe.transform(timestamp.timestamp, 'yyyy-MM-dd HH:mm:ss', 'UTC') || '';
      });
      if (this.controllerDateTime == this.prevControllerDateTime) {
        this.isErrorVisible = true;
      } else {
        this.isErrorVisible = false;
      }
      this.prevControllerDateTime = this.controllerDateTime;
    }

    onClick(): void {
      this.timestampStrings = [];
    }

    transformDate(dateString: string): string {
      return this.datePipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss', 'UTC') || '';
    }

    ngOnInit(): void {
      
      this.updateDateTime();
      setInterval(() => {
          this.updateDateTime();
      }, 1000); // Update every second

      this.timestampService.getRaw().subscribe(raw => {
        if (raw.raw == 1) {
          if (this.buttonStatus == 0) {
            this.timestampService.getTimestamp().subscribe(timestamp => {
              this.timestampStrings.push(this.transformDate(timestamp.timestamp) + " - нажатие кнопки ");
            });
            this.buttonStatus = 1;
          }
        }
        if (raw.raw == 0) {
          if (this.buttonStatus == 1) {
            this.timestampService.getTimestamp().subscribe(timestamp => {
              this.timestampStrings.push(this.transformDate(timestamp.timestamp) + " - кнопка отпущена ");
            });
            this.buttonStatus = 0;
          }
        }
      });
    }
}
