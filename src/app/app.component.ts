import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimestampComponent } from './timestamp/timestamp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimestampComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'microsecurity-frontend';
}
