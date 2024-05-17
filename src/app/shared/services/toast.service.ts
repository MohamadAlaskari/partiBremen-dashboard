import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  private currentId = 0;

  show(
    type: 'success' | 'warning' | 'error' | 'info',
    title: string,
    message: string
  ) {
    const toast: Toast = { id: this.currentId++, type, title, message };
    this.toastSubject.next([...this.toastSubject.value, toast]);
    setTimeout(() => this.closeToast(toast.id), 3000);
  }

  getToasts() {
    return this.toastSubject.asObservable();
  }
  closeToast(id: number) {
    const toasts = this.toastSubject.value.filter((toast) => toast.id !== id);
    this.toastSubject.next(toasts);
  }
}
