import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { AdmPropertyService } from 'src/app/service/adm-property.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-adm-property-register',
  templateUrl: './adm-property-register.page.html',
  styleUrls: ['./adm-property-register.page.scss'],
  standalone: true,
  providers: [
    ViaCepService, AdmPropertyService
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

  propertyDetails = [
    { id: 1, label: 'Área de serviço', formControlName: 'serviceArea' },
    { id: 2, label: 'Armários no quarto', formControlName: 'bedroomCabinets' },
    { id: 3, label: 'Ar condicionado', formControlName: 'airConditioner' },
    { id: 4, label: 'Varanda', formControlName: 'balcony' },
    { id: 5, label: 'Armários na cozinha', formControlName: 'kitchenCabinets' },
    { id: 6, label: 'Mobiliado', formControlName: 'furnished' },
    { id: 7, label: 'Churrasqueira', formControlName: 'barbecue' },
    { id: 8, label: 'Quarto de serviço', formControlName: 'serviceRoom' },
  ];

  condominiumDetails = [
    { id: 1, label: 'Condomínio fechado', formControlName: 'gatedCommunity' },
    { id: 2, label: 'Área murada', formControlName: 'walledArea' },
    { id: 3, label: 'Portão eletrônico', formControlName: 'electricGate' },
    { id: 4, label: 'Piscina', formControlName: 'swimmingPool' },
    { id: 5, label: 'Segurança 24h', formControlName: 'security24h' },
    { id: 6, label: 'Permitido animais', formControlName: 'petsAllowed' },
    { id: 7, label: 'Academia', formControlName: 'gym' },
  ];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private admPropertyService: AdmPropertyService,
    private alertController: AlertController
  ) {
    this.propertyRegisterForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      isForSale: [false, Validators.required],
      isForRent: [false, Validators.required],
      bedroomNumber: ['', Validators.required],
      restroomNumber: ['', Validators.required],
      area: ['', Validators.required],
      garage: ['', Validators.required],
      condominiumFee: ['', Validators.required],
      iptu: ['', Validators.required],
      price: ['', Validators.required],
      selectedImages: [null],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      propertyAttributes: this.fb.array([]),
      condominiumAttributes: this.fb.array([]),
    })
  }

  ngOnInit() {
    this.addCheckboxes();
  }

  addCheckboxes(): void {
    this.propertyDetails.forEach(() =>
      this.propertyAttributes.push(this.fb.control(false))
    );
    this.condominiumDetails.forEach(() =>
      this.condominiumAttributes.push(this.fb.control(false))
    );
  }

  get propertyAttributes(): FormArray {
    return this.propertyRegisterForm.get('propertyAttributes') as FormArray;
  }

  get condominiumAttributes(): FormArray {
    return this.propertyRegisterForm.get('condominiumAttributes') as FormArray;
  }

  numberOnlyValidation(event: any){
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  noSpecialCharValidation(event: any){
    const pattern = /^[a-zA-Z0-9 ]*$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  formatPrice(event: any): void {
    let price = this.propertyRegisterForm.get('price')?.value;

    if (price) {
        price = price.replace(/[^\d]/g, '');

        const numericPrice = Number(price) / 100;

        const formattedPrice = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(numericPrice);

        this.propertyRegisterForm.get('price')?.setValue(formattedPrice);
    }
}



  formatMeters(event: any): void {
    const price = this.propertyRegisterForm.get('area')?.value;
    this.propertyRegisterForm.get('area')?.setValue(`${price.replace(/[^\d.,]/g, '')} m²`);
  }
  
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = Array.from(input.files).slice(0, 20);
      this.selectedImagesPreview = [];
  
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.selectedImagesPreview.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
  
      this.propertyRegisterForm.get('selectedImages')?.setValue(files);
    }
  }

  async showPropertyAddressDetailsByCep(event: any) {
    let inputChar = String.fromCharCode(event.charCode);
    const cep = this.propertyRegisterForm.get('cep')?.value+inputChar

    if (this.propertyRegisterForm.get('cep')?.value.length == 9) {
      event.preventDefault();
    }
    
    if(cep.length == 9) {
      const addressDetails = await this.viaCepService.findAddressInfoByCep(cep.replace("-", ""));
      if(addressDetails.erro) {
        this.showCepErrorMsg = true;
      } else {
        this.showCepErrorMsg = false;
        this.addressDetails = addressDetails;
      }
    }
  }

  onSubmit(formData: any) {
    console.log(formData)

    const propertyAttributes = this.propertyDetails
      .filter((detail, index) => formData.propertyAttributes[index])
      .map(detail => detail.id);

    const condominiumAttributes = this.condominiumDetails
      .filter((detail, index) => formData.condominiumAttributes[index])
      .map(detail => detail.id);

    const propertyRequest = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      isForSale: formData.isForSale,
      isForRent: formData.isForRent,
      bedroomNumber: formData.bedroomNumber,
      restroomNumber: formData.restroomNumber,
      area: formData.area.replace(" m²", ""),
      garageSpaces: formData.garageSpaces,
      condominiumFee: this.formatCurrencyToNumber(formData.condominiumFee),
      iptu: this.formatCurrencyToNumber(formData.iptu),
      price: this.formatCurrencyToNumber(formData.price),
      cep: formData.cep,
      createdBy: formData.createdBy,
      propertyAttributes: propertyAttributes,
      condominiumAttributes: condominiumAttributes,
    };
  
    const formDataToSend = new FormData();
    formDataToSend.append('propertyData', new Blob([JSON.stringify(propertyRequest)], { type: 'application/json' }));
  
    const selectedImages = this.propertyRegisterForm.get('selectedImages')?.value;
    if (selectedImages) {
      selectedImages.forEach((file: File) => {
        formDataToSend.append('images', file);
      });
    }
  
    this.admPropertyService.registerProperty(formDataToSend).subscribe(response => {
      this.showAlert('Sucesso', 'Imóvel salvo com sucesso.');
    }, error => {
      this.showAlert('Erro', `Falha ao salvar o imóvel: ${error.message}.`);
    });
  }  

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  formatCurrencyToNumber(value: string): string {
    if (!value) {
      throw new Error("O valor fornecido está vazio.");
    }
  
    const sanitizedValue = value.replace(/[^\d,.-]/g, "").replace(".", "");
    const numericValue = sanitizedValue.replace(",", ".");
  
    return numericValue;
  }

  isLoading(): void {
    this.loading = !this.loading;
  }
  
}
