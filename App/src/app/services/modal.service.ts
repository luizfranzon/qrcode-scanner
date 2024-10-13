import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalCloseSubject = new Subject<void>();

  modalClose$ = this.modalCloseSubject.asObservable();

  notifyModalClose() {
    this.modalCloseSubject.next();
  }
}
