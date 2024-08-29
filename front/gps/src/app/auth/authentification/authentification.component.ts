import { Component, NgModule } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  // Variables pour le binding
  username!: string;
  password!: string;
  error!: string;
  
  constructor(private authService: AuthServiceService) {}
 

  // Méthode appelée lors de la soumission du formulaire
  login() {
    this.authService.login(this.username, this.password).subscribe({
      
      next: (response) => {
        console.log("pass et log",this.username,this.password)
        // Sauvegardez le token dans le stockage local ou les cookies
        localStorage.setItem('token', response.token);
        // Redirigez l'utilisateur vers la page d'accueil ou le tableau de bord
        
      },
      error: (err) => {
        // Gérez les erreurs ici
        this.error = 'Invalid credentials';
      }
    });
  }

  logout() {
    this.authService.logout();
  }


 
}
