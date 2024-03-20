import { Component } from '@angular/core';
import { TimestampService } from '../timestamp.service';
import { CommonModule } from '@angular/common';
import { TimestampObject } from '../dto/timestamp';

@Component({
  selector: 'app-timestamp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timestamp.component.html',
  styleUrl: './timestamp.component.css'
})

export class TimestampComponent {
    timestampStrings: string[] = []
    buttonStatus: number = 0;
    currentDateTime: Date = new Date();

    constructor(
      private timestampService: TimestampService
    ) {}

    updateDateTime() {
      this.currentDateTime = new Date();
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
              this.timestampStrings.push(timestamp.timestamp + " - нажатие кнопки ");
            });
            this.buttonStatus = 1;
          }
        }
        if (raw.raw == 0) {
          if (this.buttonStatus == 1) {
            this.timestampService.getTimestamp().subscribe(timestamp => {
              this.timestampStrings.push(timestamp.timestamp + " - кнопка отпущена ");
            });
            this.buttonStatus = 0;
          }
        }
      });
    }
}
