import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ScanModel } from '../models/scan.model';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  public async loadHistoryData() {
    this.checkIfDataIsNull();

    const data = (await Storage.get({ key: 'history' })).value;
    const formattedData = JSON.parse(data!) as ScanModel[];

    return formattedData;
  }

  public async pushToHistoryData(data: ScanModel) {
    const historyData = await this.loadHistoryData();

    historyData.push(data);

    await Storage.set({
      key: 'history',
      value: JSON.stringify(historyData),
    });
  }

  public async clearHistoryData() {
    await Storage.set({
      key: 'history',
      value: JSON.stringify([]),
    });
  }

  private async checkIfDataIsNull() {
    const data = await Storage.get({ key: 'history' });

    if (data.value === null) {
      await Storage.set({
        key: 'history',
        value: JSON.stringify([]),
      });
    }
  }

  public async removeItemFromHistoryData(id: string) {
    const historyData = await this.loadHistoryData();
    const filteredData = historyData.filter((item) => item.id !== id);

    await Storage.set({
      key: 'history',
      value: JSON.stringify(filteredData),
    });
  }
}
