import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, 
  IonToolbar, IonInput, IonList,
  IonItem, IonSelectOption, IonSelect,
  IonButton, IonCardContent, IonLabel, 
  IonCardTitle, IonCardHeader, IonCard,
  IonCheckbox, 
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-adm-property-register',
  templateUrl: './adm-property-register.page.html',
  styleUrls: ['./adm-property-register.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
    IonInput, IonList, IonItem,
    IonSelectOption, IonSelect, IonButton,
    IonCardContent, IonCardTitle, IonLabel, 
    IonCardHeader, IonCard, IonCheckbox,
    ReactiveFormsModule
  ]
})
export class AdmPropertyRegisterPage implements OnInit {
  selectedImagesPreview: string[] = [];

  propertyRegisterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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

  onSubmit(): void {
    console.log(this.propertyRegisterForm.value);
  }
}
