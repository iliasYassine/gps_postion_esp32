import { Routes } from '@angular/router';
import { GpsComponent } from './gps/gps/gps.component';
import { ChibaniComponent } from './users/chibani/chibani.component';

export const routes: Routes = [ 
    { path: 'gps', component: GpsComponent, pathMatch: 'full' },
    
    { path: 'users', component: ChibaniComponent },];
