import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, 
  IonToolbar, IonInput, IonList,
  IonItem, IonSelectOption, IonSelect,
  IonButton, IonCardContent, IonLabel, 
  IonCardTitle, IonCardHeader, IonCard,
  IonCheckbox, IonText, IonIcon,
  IonModal
} from '@ionic/angular/standalone';
import { IonicSlides, ModalController } from '@ionic/angular';
import { PropertyDetailsResponse, PropertyImageResponse } from 'src/app/model/property-adm/property.model';
import { ActivatedRoute } from '@angular/router';
import { AdmPropertyService } from 'src/app/service/adm-property.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { PropertyImageModalComponent } from 'src/app/modal/property-image-modal/property-image-modal.component';

addIcons({
  'checkmark-circle': checkmarkCircle,
  'close-circle': closeCircle
});

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
  standalone: true,
  providers: [
    AdmPropertyService, ModalController
  ],
  imports: [
    IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
    IonInput, IonList, IonItem,
    IonSelectOption, IonSelect, IonButton,
    IonCardContent, IonCardTitle, IonLabel, 
    IonCardHeader, IonCard, IonCheckbox,
    IonText, IonIcon, IonModal
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PropertyDetailPage implements OnInit {

  swiperModules = [IonicSlides];
  isFullscreen = false;
  currentIndex = 0;
  property!: PropertyDetailsResponse;

  constructor(
    private route: ActivatedRoute,
    private propertyService: AdmPropertyService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.loadPropertyDetails(+propertyId);
    }
  }

  loadPropertyDetails(propertyId: number) {
    this.propertyService.getPropertyDetails(propertyId).subscribe({
      next: (response: PropertyDetailsResponse) => {
        this.property = response;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar detalhes do imóvel:', err);
      },
    });
  }

  getImageBase64(image: PropertyImageResponse): string {
    return `data:image/${image.imageType};base64,${image.imageData}`;
  }

  async openImageModal() {
    const modal = await this.modalController.create({
      component: PropertyImageModalComponent,
      componentProps: {
        property: this.property
      }
    });
    await modal.present();
  }
}