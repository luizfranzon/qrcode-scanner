import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonThumbnail,
  IonButton,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  imports: [
    IonIcon,
    IonLabel,
    IonButton,
    IonCardContent,
    IonCard,
    IonTextarea,
    IonText,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonThumbnail,
    CommonModule,
    FormsModule,
    QRCodeModule,
  ],
  standalone: true,
})
export class CreatePage {
  textToBeEncoded = signal<string>('');

  onTextChange(event: Event) {
    this.textToBeEncoded.set((event.target as HTMLTextAreaElement).value);
  }

  constructor() {
    addIcons({ saveOutline });
  }
}
