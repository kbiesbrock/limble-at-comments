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
  activities: string[] = [];

  saveNewCommentAndNotifyUsers($event: {
    comment: String;
    taggedUsers: { userID: number; name: string }[];
  }) {
    const commentModel = this.saveComment($event.comment.toString());
    this.notifyUsers($event.comment.toString(), $event.taggedUsers);
    this.comments.push($event.comment.toString());
  }

  saveComment(comment: string) {
    // const commentModel = saveToDatabase(comment);
    // return commentModel;
    this.activities.push(`Saved to database: ${comment}`);
  }

  notifyUsers(
    commentModel: string,
    taggedUsers: { userID: number; name: string }[]
  ) {
    if (!taggedUsers.length) {
      return;
    }
    // emailUsers(taggedUsers, commentModel);
    this.activities.push(
      `Emailed users: ${taggedUsers.map((user) => user.name).join(', ')}`
    );
  }
}
