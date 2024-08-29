import { Routes } from '@angular/router';
import { GpsComponent } from './gps/gps/gps.component';
import { ChibaniComponent } from './users/chibani/chibani.component';
import { AuthentificationComponent } from './auth/authentification/authentification.component';
import { AuthGuard } from './auth/auth.guards'

export const routes: Routes = [ 
    { path: 'gps', component: GpsComponent, pathMatch: 'full' ,canActivate: [AuthGuard],},
    
    { path: 'users', component: ChibaniComponent,canActivate: [AuthGuard], },
    { path: 'login', component: AuthentificationComponent,},
    
];
