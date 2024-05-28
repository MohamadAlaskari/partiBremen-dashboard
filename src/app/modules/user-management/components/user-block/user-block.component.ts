import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserBlockService } from '../../services/user-block/user-block.service';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.scss']
})
export class UserBlockComponent {
  title: string = 'Block until';
  blockUntilDate!: Date; // Keep it as Date type
  @Input() userId: string = '';


  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private userBlockService: UserBlockService,
    private router: Router,
    private datePipe: DatePipe // Inject DatePipe
  ) {}


  ngOnInit(): void {
    console.log('UserId received in UserBlockComponent:', this.userId);
  }

  extractIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      const id = params.get('id');
      if (id !== null) {
        this.userId = id;
      }
      console.log("id" ,this.userId);
    });
  }




  onCancel(): void {
    this.router.navigate(['/user-management']);
  }
}
