import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonButton,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Clipboard } from '@capacitor/clipboard';
import { ScanModel } from 'src/app/models/scan.model';
import { ScanService } from 'src/app/services/scan.service';
import {
  trash,
  copyOutline,
  chevronBackOutline,
  fileTrayStackedOutline,
  closeOutline,
} from 'ionicons/icons';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  standalone: true,
  imports: [
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonLabel,
    IonItem,
    IonButton,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class HistoryPage implements OnInit {
  private scanService = inject(ScanService);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private modalNotificationService = inject(ModalService);

  historyData = signal<ScanModel[]>([]);

  constructor() {
    addIcons({
      trash,
      chevronBackOutline,
      copyOutline,
      fileTrayStackedOutline,
      closeOutline,
    });
  }

  ngOnInit() {
    this.modalNotificationService.modalClose$.subscribe(() => {
      this.reloadHistoryData();
    });
  }

  async ionViewWillEnter() {
    await this.loadData();
  }

  private async loadData() {
    const data = await this.scanService.loadHistoryData();
    this.historyData.set(data);

    return data;
  }

  private async reloadHistoryData() {
    this.historyData.set(await this.loadData());
  }

  async presentConfirmClearHistoryAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Clear History',
      message: 'Are you sure you want to clear the history?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Clear',
          handler: () => this.clearHistoryData(),
        },
      ],
    });
    await alert.present();
  }

  async copyToClipboard(data: string, slidingElement: IonItemSliding) {
    await Clipboard.write({ string: data });
    slidingElement.close();
    await this.presentToast('Copied to clipboard');
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      color: 'success',
      duration: 2000,
      position: 'top',
      swipeGesture: 'vertical',
      buttons: [{ side: 'end', icon: 'close-outline' }],
    });
    await toast.present();
  }

  removeItemFromHistory(id: string) {
    const filteredData = this.historyData().filter((item) => item.id !== id);
    this.historyData.set(filteredData);
    this.scanService.removeItemFromHistoryData(id);
  }

  async presentConfirmRemoveItemFromHistory(
    id: string,
    slidingElement: IonItemSliding
  ) {
    const alert = await this.alertCtrl.create({
      header: 'Remove Item',
      message: 'Are you sure you want to remove this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Remove',
          handler: () => {
            slidingElement.close();
            this.removeItemFromHistory(id);
          },
        },
      ],
    });
    await alert.present();
  }

  private clearHistoryData() {
    this.scanService.clearHistoryData();
    this.historyData.set([]);
  }
}
