import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Poi } from '../../../core/models/partiBremen.model';

@Component({
  selector: 'app-poi-card',
  templateUrl: './poi-card.component.html',
  styleUrl: './poi-card.component.scss',
})
export class PoiCardComponent {
  @Input() poi!: Poi;
  @Output() poiSelected = new EventEmitter<string>();

  getVoteCount(voteType: string): number {
    return this.poi.votings.filter((v) => v.voteType === voteType).length;
  }

  selectPoi(): void {
    this.poiSelected.emit(this.poi.id);
  }
}
