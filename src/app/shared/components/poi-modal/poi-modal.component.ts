import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { ToastService } from '../../services/toast.service';
import { UserManagementService } from '../../../modules/user-management/services/user-management-service/user-management.service';
import { Poi } from '../../../core/models/partiBremen.model';

@Component({
  selector: 'app-poi-modal',
  templateUrl: './poi-modal.component.html',
  styleUrl: './poi-modal.component.scss',
})
export class PoiModalComponent {
  @Input() selectedPoi: Poi | null = null;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private userService: UserManagementService
  ) {}

  getVoteCount(poiId: string, voteType: string): number {
    if (this.selectedPoi) {
      return this.selectedPoi.votings.filter((v) => v.voteType === voteType)
        .length;
    }
    return 0;
  }

  getInitials(name: string, surname: string): string {
    return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
  }

  addComment(poiId: string, commentText: string): void {}
}
