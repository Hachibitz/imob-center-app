import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-adm-property-register',
  templateUrl: './adm-property-register.page.html',
  styleUrls: ['./adm-property-register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AdmPropertyRegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
