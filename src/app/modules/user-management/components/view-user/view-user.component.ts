import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
})
export class ViewUserComponent {
  title: string = 'View User';
  id: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
    private toastService: ToastService
  ) {
   
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }
}
