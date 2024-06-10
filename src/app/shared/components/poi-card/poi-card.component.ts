import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Poi, Voting } from '../../../core/models/partiBremen.model';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poi-card',
  templateUrl: './poi-card.component.html',
  styleUrl: './poi-card.component.scss',
})
export class PoiCardComponent {
  @Input() poi!: Poi;
  @Output() poiSelected = new EventEmitter<string>();
  subscriptions = new Subscription();

  constructor(toastService: ToastService) {}

  vote(poiId: string, voteType: string): void {
    /*
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.toastService.show('error', 'Error', 'User not logged in');
      return;
    }

    const voting: Voting = {
      votedPoiId: poiId,
      voterId: currentUser.id,
      voteType: voteType,
    };

    const sub = this.userService.vote(voting).subscribe({
      next: () => {
        console.log('Vote added successfully');
      },
      error: () => {
        console.log();
      },
    });
    this.subscriptions.add(sub);*/
  }
  getVoteCount(voteType: string): number {
    return this.poi.votings.filter((v) => v.voteType === voteType).length;
  }

  selectPoi(): void {
    this.poiSelected.emit(this.poi.id);
  }
}
