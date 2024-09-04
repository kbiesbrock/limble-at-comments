import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HighlightPipe } from '../highlight/highlight.pipe';

type User = {
  userID: number;
  name: string;
};

@Component({
  selector: 'new-comment',
  standalone: true,
  imports: [ReactiveFormsModule, HighlightPipe],
  templateUrl: './new-comment.component.html',
})
export class NewCommentComponent {
  protected comment = new FormControl('');
  @ViewChild('commentInput', { static: false })
  protected commentInputElement!: ElementRef<HTMLInputElement>;
  protected taggedUserIDs: User[] = [];
  protected searchString: string = '';
  protected filteredSuggestions: User[] = [];
  protected showSuggestions = false;
  protected highlightedSuggestionIndex = -1;

  private suggestions: User[] = [
    { userID: 1, name: 'Kevin' },
    { userID: 2, name: 'Jeff' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' },
  ];

  @Output() addNewComment = new EventEmitter<{
    comment: String;
    taggedUsers: User[];
  }>();

  emitComment(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const value = this.comment.value || '';
    if (value === null) {
      return;
    }
    this.addNewComment.emit({
      comment: value,
      taggedUsers: this.taggedUserIDs,
    });
    this.comment.setValue('');
    this.resetSuggestions();
    this.taggedUserIDs = [];
  }

  onKeyPress(event: KeyboardEvent) {
    // console.log(event);

    if (!this.showSuggestions) {
      return;
    }

    switch (event.code) {
      case 'Tab':
        event.preventDefault();
        if (event.shiftKey) {
          this.decreaseSuggestionIndex();
        } else {
          this.increaseSuggestionIndex();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.decreaseSuggestionIndex();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.increaseSuggestionIndex();
        break;
      case 'Enter':
        event.preventDefault();
        this.suggestionSelected(
          this.filteredSuggestions[this.highlightedSuggestionIndex],
          this.commentInputElement.nativeElement
        );
        this.resetSuggestions();
        break;
      case 'Escape':
        event.preventDefault();
        this.resetSuggestions();
    }
  }

  /**
   * Conditions for when to show suggestions:
   *  1. When "@" is first typed
   *  2. After "@" is typed, suggestions closed, and backspace key is used within
   *     within the same word
   *  3. When user taps into input, begins typing where word is prefixed with "@"
   * @param event The input event
   * @returns void
   */
  onInputChange(event: Event) {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const value: string | null = this.comment.value || null;
    if (value === null || value === '') {
      this.resetSuggestions();
      return; // Nothing to filter here.
    }

    const limitLastIndexStartToCursorLocation =
      inputElement.selectionStart || undefined;
    const lastAtIndex = value.lastIndexOf(
      '@',
      limitLastIndexStartToCursorLocation
    );

    if (lastAtIndex === -1) {
      this.resetSuggestions();
      return;
    }

    const lastChar = value[lastAtIndex - 1];
    if (lastChar !== undefined && lastChar.match(/[a-zA-Z]/) !== null) {
      this.resetSuggestions();
      return;
    }

    this.showSuggestions = true;

    const cursorPosition: number = inputElement.selectionStart || 0;
    this.searchString = value.substring(lastAtIndex + 1, cursorPosition);

    // console.log(this.searchString, lastAtIndex, cursorPosition);

    if (
      this.searchString.includes(' ') ||
      this.searchString.match(/[^a-zA-Z]/g) !== null
    ) {
      this.resetSuggestions();
      return;
    }

    this.filteredSuggestions = this.suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(this.searchString.toLowerCase())
    );
  }

  resetSuggestions() {
    this.showSuggestions = false;
    this.filteredSuggestions = [];
    this.highlightedSuggestionIndex = -1;
  }

  decreaseSuggestionIndex() {
    if (this.highlightedSuggestionIndex <= 0) {
      this.highlightedSuggestionIndex = this.filteredSuggestions.length - 1;
    } else {
      this.highlightedSuggestionIndex -= 1;
    }
    setTimeout(() => this.keepInView(), 100); // give angular a chance to modify dom
  }

  increaseSuggestionIndex() {
    if (
      this.highlightedSuggestionIndex >=
      this.filteredSuggestions.length - 1
    ) {
      this.highlightedSuggestionIndex = 0;
    } else {
      this.highlightedSuggestionIndex += 1;
    }
    setTimeout(() => this.keepInView(), 100); // give angular a chance to modify dom
  }

  keepInView() {
    const selectedSuggestion = document.querySelector(
      '.suggestions .suggestion.selected-suggestion'
    );
    selectedSuggestion?.scrollIntoView();
  }

  suggestionSelected(selectedUser: User, inputElement: HTMLInputElement) {
    const comment = this.comment.value || '';
    const narrowLastIndexSearchToCursorLocation = inputElement.selectionStart;
    const lastAtIndex = comment.lastIndexOf(
      '@',
      narrowLastIndexSearchToCursorLocation || comment.length
    );
    let updatedComment = comment.substring(0, lastAtIndex);
    updatedComment += '@' + selectedUser.name;
    updatedComment += comment.substring(
      lastAtIndex + 1 + this.searchString.length
    );

    this.comment.setValue(updatedComment);
    this.taggedUserIDs.includes(selectedUser) ||
      this.taggedUserIDs.push(selectedUser);
    this.resetSuggestions();
  }
}
