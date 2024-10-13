import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonTabs,
  IonTab,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { addOutline, qrCodeOutline, timeOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular/standalone';
import { ScanService } from 'src/app/services/scan.service';
import { v4 as uuidv4 } from 'uuid';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHintALLOption,
} from '@capacitor/barcode-scanner';
import { ScanResultComponent } from 'src/app/components/scan-result/scan-result.component';
import { ScanModel } from 'src/app/models/scan.model';
import { ModalService } from 'src/app/services/modal.service';

interface ITabs {
  title: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  standalone: true,
  imports: [
    IonLabel,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonTab,
    IonTabs,
    RouterModule,
  ],
})
export class TabNavigationComponent {
  modalCtrl = inject(ModalController);
  scanService = inject(ScanService);
  modalNotificationService = inject(ModalService);

  public tabs: ITabs[] = [
    {
      title: 'Scan',
      icon: 'qr-code-outline',
      url: 'scanner',
    },
    {
      title: 'History',
      icon: 'time-outline',
      url: 'history',
    },
  ];

  startScan() {
    CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHintALLOption.ALL,
    }).then((result) => {
      const newScan: ScanModel = {
        id: uuidv4(),
        text: result.ScanResult,
        date: new Date(),
      };

      this.presentModal(result.ScanResult);
      this.scanService.pushToHistoryData(newScan);
    });
  }

  async presentModal(scanResultData: string) {
    const modal = await this.modalCtrl.create({
      id: 'scan-result',
      component: ScanResultComponent,
      componentProps: {
        scanResultData,
      },
    });

    await modal.present();

    await modal.onDidDismiss().then(() => {
      this.modalNotificationService.notifyModalClose();
    });
  }

  constructor() {
    addIcons({ qrCodeOutline, addOutline, timeOutline });
  }
}
