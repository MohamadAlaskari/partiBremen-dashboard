export interface Toast {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
}
