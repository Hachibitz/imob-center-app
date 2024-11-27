import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, 
  IonToolbar, IonInput, IonList,
  IonItem, IonSelectOption, IonSelect,
  IonButton, IonIcon, IonCardContent,
  IonCardTitle, IonCardHeader, IonCard,
  IonCheckbox, IonLabel
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
    IonIcon, IonCardContent, IonCardTitle,
    IonCardHeader, IonCard, IonCheckbox,
    IonLabel,
  ]
})
export class AdmPropertyRegisterPage implements OnInit {
  quartos: number = 0;
  banheiros: number = 0;
  area: number = 0;
  garagem: number = 0;
  condominio: number = 0;
  iptu: number = 0;
  preco: number = 0;
  imagemSelecionada: string | null = null;
  cep: number = 0;

  constructor() { }

  ngOnInit() {
  }

  validaSomenteNumero(event: any){
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagemSelecionada = e.target.result; // Carrega a imagem como base64
      };
      reader.readAsDataURL(file);
    }
  }
}
