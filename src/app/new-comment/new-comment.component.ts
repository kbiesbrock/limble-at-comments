import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'new-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.scss',
})
export class NewCommentComponent {
  protected comment = new FormControl('');

  @Output() addNewComment = new EventEmitter<String>();

  emitComment(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.comment.value) {
      this.addNewComment.emit(this.comment.value);
    }
  }
}
