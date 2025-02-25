import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DestinationsTableComponent } from './components/destinations-table/destinations-table.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, DestinationsTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hotelBediaX';
}
