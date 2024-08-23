import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NewCommentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'Limble @ in comments';
  comments: string[] = [
    'This is a comment',
    'This is another comment',
    'This is yet another comment',
  ];
}
