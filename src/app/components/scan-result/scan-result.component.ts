import { Component, inject, input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';

import { Clipboard } from '@capacitor/clipboard';

import { addIcons } from 'ionicons';
import { arrowBack, closeOutline, copyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.component.html',
  standalone: true,
  imports: [
    IonTextarea,
    IonText,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonHeader,
  ],
})
export class ScanResultComponent {
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);

  public scanResultData = input.required<string>();

  constructor() {
    addIcons({ arrowBack, copyOutline, closeOutline });
  }

  dismiss() {
    this.modalCtrl.dismiss('scan-result');
  }

  async copyResultToClipboard() {
    await Clipboard.write({
      string: this.scanResultData as unknown as string,
    }).then(() => this.presentToast());
  }

  async presentToast() {
    await this.toastCtrl
      .create({
        message: 'Copied to clipboard',
        color: 'success',
        duration: 2000,
        position: 'top',
        swipeGesture: 'vertical',
        buttons: [
          {
            side: 'end',
            icon: 'close-outline',
          },
        ],
      })
      .then((toast) => toast.present());
  }
}
