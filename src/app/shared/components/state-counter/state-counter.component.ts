import { Component, Input } from '@angular/core';

export interface CounterState {
  count: number;
  label: string;
}

@Component({
  selector: 'app-state-counter',
  templateUrl: './state-counter.component.html',
  styleUrl: './state-counter.component.scss',
})
export class StateCounterComponent {
  @Input() states: CounterState[] = [];
}
