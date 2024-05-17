import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/Services/api.service';
import { Observable } from 'rxjs';
import { Comment } from '../../../shared/models/comment.model';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CommentManagementService {

  private endpoints = environment.endpoints.comments;

  constructor(private apiService: ApiService) {}

  getComments(): Observable<Comment[]> {
    return this.apiService.get<Comment[]>(`${this.endpoints.getAll}`);
  }

  deleteComment(commentId: string): Observable<Comment> {
    return this.apiService.delete<any>(`${this.endpoints.delete}/${commentId}`);
  }

}
