import { Component } from '@angular/core';
import { AuthAService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tiendaChocolates';
  constructor(
    public authService: AuthAService
  ){}
}
