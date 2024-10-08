import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight', standalone: true })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (search && text) {
      let pattern = search.replace(
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        '\\$&'
      );
      pattern = pattern
        .split(' ')
        .filter((t) => {
          return t.length > 0;
        })
        .join('|');
      const regex = new RegExp(pattern, 'gi');

      return text.replace(
        regex,
        (match) => `<span class="search-highlight">${match}</span>`
      );
    } else {
      return text;
    }
  }
}
