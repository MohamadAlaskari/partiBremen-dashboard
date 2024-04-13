import { Component, Input } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../models/toast.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  toasts: Toast[] = [];
  private subscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.subscription = this.toastService.getToasts().subscribe({
      next: (toasts) => {
        this.toasts = toasts;
      },
    });
  }

  // Methode zum Schließen des Toasts
  closeToast(id: number) {
    this.toastService.closeToast(id);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
