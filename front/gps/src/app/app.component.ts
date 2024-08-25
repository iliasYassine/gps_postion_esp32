import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PostionGpsService } from './gps/postion-gps.service';
import { GpsComponent } from './gps/gps/gps.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GpsComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gps';
  constructor(router: Router) {
    // Ajouter les routes à la configuration du routeur
    router.resetConfig(routes);
  }
}
