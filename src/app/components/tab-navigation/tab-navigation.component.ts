import { Component } from '@angular/core';
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
  public tabs: ITabs[] = [
    {
      title: 'Scan',
      icon: 'qr-code-outline',
      url: 'scanner',
    },
    {
      title: 'Create',
      icon: 'add-outline',
      url: 'create',
    },
    {
      title: 'History',
      icon: 'time-outline',
      url: 'history',
    },
  ];

  constructor() {
    addIcons({ qrCodeOutline, addOutline, timeOutline });
  }
}
