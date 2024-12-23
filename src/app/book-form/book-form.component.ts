import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent {
  @Input() book: Book|undefined = undefined;
  @Output() cancelledForm = new EventEmitter<void>();
  @Output() save = new EventEmitter<Book>();

  getvalue(event: any): string {
    return event.target.value;
  }
  getnumber(event: any): number {
    return event.target.value as number;
  }
  saveBook() {
    this.save.emit(this.book);
  }
  cancel() {
    this.cancelledForm.emit();
  }
}
