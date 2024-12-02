import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicSlides } from '@ionic/angular';
import { PropertyDetailsResponse, PropertyImageResponse } from 'src/app/model/property-adm/property.model';
import { 
    IonHeader, IonContent, IonToolbar, 
    IonTitle, IonButtons, IonButton
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-image-modal',
  templateUrl: './property-image-modal.component.html',
  styleUrls: ['./property-image-modal.component.scss'],
  standalone: true,
  providers: [
    ModalController
  ],
  imports: [
    IonHeader, IonContent, IonToolbar, 
    IonTitle, IonButtons, IonButton,
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PropertyImageModalComponent implements OnInit {
  private _property!: PropertyDetailsResponse;
  @Input() set property(value: PropertyDetailsResponse) {
    this._property = value;
  };

  get property(): PropertyDetailsResponse {
    return this._property;
  }
  
  currentIndex = 0;

  swiperModules = [IonicSlides];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    
  }

  close() {
    this.modalController.dismiss();
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  getImageBase64(image: PropertyImageResponse): string {
    return `data:image/${image.imageType};base64,${image.imageData}`;
  }
}
