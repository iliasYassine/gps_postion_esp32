import { Component, OnInit } from '@angular/core';
import { USERS } from '../chibani.model';
import { ChibaniService } from '../chibani.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chibani',
  standalone: true,
  imports: [NgFor],
  templateUrl: './chibani.component.html',
  styleUrl: './chibani.component.css'
})
export class ChibaniComponent implements OnInit {

  chibani:USERS[]=[];

  constructor(private chibaniService:ChibaniService){};

  getChibani(): void {
    this.chibaniService.getUsersInfo().subscribe(data=>this.chibani=data);
  }


  ngOnInit(): void {
      this.getChibani();
  }



  
}
