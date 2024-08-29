import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GPS } from '../gps.model';
import { PostionGpsService } from '../postion-gps.service';
import { NgFor, NgIf } from '@angular/common';
import { ChibaniService } from '../../users/chibani.service';
import * as L from 'leaflet';
import { USERS } from '../../users/chibani.model';
import { FormsModule, NgForm, NgModel, NgModelGroup } from '@angular/forms';
@Component({
  selector: 'app-gps',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './gps.component.html',
  styleUrl: './gps.component.css'
})
export class GpsComponent implements OnInit, AfterViewInit   {
  position:GPS[]=[];
  users:USERS[]=[];

  private markers: Map<number, L.Marker> = new Map();
  searchId!: number;
  private map!: L.Map;


  constructor(private gpsservice: PostionGpsService,private chibaniService:ChibaniService) {}


  
  ngOnInit(): void { 
   this.getInfoGps();
   
  }


  ngAfterViewInit(): void {
  this.initMap(); // Initialisez d'abord la carte

  setTimeout(() => {
    
    if(this.map) {
      this.map.invalidateSize();
      
    }
  }, 0);
}

  getInfoGps(){
    this.gpsservice.getGpsInfo().subscribe((data:GPS[])=>{
      this.position=data;
    })
  }

  

  private initMap(): void {

    
    // Initialisation de la carte centrée sur une position spécifique
    this.map = L.map('map').setView([48.8566, 2.3522], 13); // Exemple : Paris, France
    // Ajouter une couche de tuiles (tile layer) OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    
      // Appel asynchrone pour récupérer les positions GPS
    this.gpsservice.getGpsInfo().subscribe((data: GPS[]) => {
      this.position = data;
      this.addMarkersToMap();  // Ajouter les marqueurs une fois les données reçues
    });
  }



private addMarkersToMap(): void {
  // D'abord, récupérez tous les utilisateurs une seule fois
  this.chibaniService.getUsersInfo().subscribe((users: USERS[]) => {
    this.users = users;
    console.log(this.users);
    

    // Après avoir reçu les utilisateurs, itérez sur les positions GPS
    this.position.forEach((gps: GPS) => {
      if(gps.latitude && gps.longitude) {
       
        console.log('Recherche utilisateur avec id:', gps.personneSuivi_id);
        const latitude = parseFloat(gps.latitude);
        const longitude = parseFloat(gps.longitude);
        const marker = L.marker([latitude, longitude]);
        

        // Trouvez l'utilisateur associé à cette position
        const user = this.users.find(u => u.id == gps.personneSuivi_id);
        
        if (user) {
          
          let popupContent = `
  <b>Nom:</b> ${user.nom}<br>
  <b>Prénom:</b> ${user.prenom}<br>
  <b>Téléphone:</b> ${user.tel}<br>
  <b>Adresse:</b> ${user.adr}<br>`;
marker.bindPopup(popupContent);
          
        }

        // Ajoutez le marqueur à la carte avec son popup
        marker.addTo(this.map);
        marker.openPopup();
        this.markers.set(gps.personneSuivi_id, marker);
      }
    });
  });
}

public findAndZoomToUser(userId: number): void {
    const marker = this.markers.get(userId);
    if (marker) {
      this.map.setView(marker.getLatLng(), 18); // zoom level est à 18 ici, ajustez selon besoin
      marker.openPopup();
    } else {
      console.error("Utilisateur non trouvé avec l'ID:", userId);
      // Vous pouvez choisir d'afficher un message à l'utilisateur ici
    }
  }



}