import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, 
  IonToolbar, IonInput, IonList,
  IonItem, IonSelectOption, IonSelect,
  IonButton, IonCardContent, IonLabel, 
  IonCardTitle, IonCardHeader, IonCard,
  IonCheckbox, IonText
} from '@ionic/angular/standalone';
import { ViaCepService } from 'src/app/service/via-cep.service';
import { ViaCepFindByCepResponse } from 'src/app/model/property-adm/via-cep.model';


@Component({
  selector: 'app-adm-property-register',
  templateUrl: './adm-property-register.page.html',
  styleUrls: ['./adm-property-register.page.scss'],
  standalone: true,
  providers: [
    ViaCepService
  ],
  imports: [
    IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
    IonInput, IonList, IonItem,
    IonSelectOption, IonSelect, IonButton,
    IonCardContent, IonCardTitle, IonLabel, 
    IonCardHeader, IonCard, IonCheckbox,
    ReactiveFormsModule, IonText
  ]
})
export class AdmPropertyRegisterPage implements OnInit {
  selectedImagesPreview: string[] = [];

  propertyRegisterForm: FormGroup;

  showCepErrorMsg: Boolean = false;
  addressDetails!: ViaCepFindByCepResponse;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService
  ) {
    this.propertyRegisterForm = this.fb.group({
      bedroomNumber: ['', Validators.required],
      restroomNumber: ['', Validators.required],
      area: ['', Validators.required],
      garage: ['', Validators.required],
      condominiumFee: ['', Validators.required],
      iptu: ['', Validators.required],
      price: ['', Validators.required],
      selectedImages: [null],
      cep: ['', Validators.required],
      serviceArea: [false],
      bedroomCabinets: [false],
      airConditioner: [false],
      balcony: [false],
      kitchenCabinets: [false],
      furnished: [false],
      barbecue: [false],
      serviceRoom: [false],
      gatedCommunity: [false],
      walledArea: [false],
      electricGate: [false],
      swimmingPool: [false],
      security24h: [false],
      petsAllowed: [false],
      gym: [false],
    })
  }

  ngOnInit() {
  }

  numberOnlyValidation(event: any){
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = Array.from(input.files).slice(0, 20);
      this.selectedImagesPreview = [];
  
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            this.selectedImagesPreview.push(reader.result.toString());
          }
        };
        reader.readAsDataURL(file);
      });

      this.propertyRegisterForm.get('selectedImages')?.setValue(this.selectedImagesPreview);
    }
  }

  async showPropertyAddressDetailsByCep(event: any) {
    let inputChar = String.fromCharCode(event.charCode);
    const cep = this.propertyRegisterForm.get('cep')?.value+inputChar
    this.numberOnlyValidation(event);
    if(cep.length == 8) {
      const addressDetails = await this.viaCepService.findAddressInfoByCep(cep);
      if(addressDetails.erro) {
        this.showCepErrorMsg = true;
      } else {
        this.showCepErrorMsg = false;
        this.addressDetails = addressDetails;
      }
    }
  }

  onSubmit(): void {
    console.log(this.propertyRegisterForm.value);
  }
}
