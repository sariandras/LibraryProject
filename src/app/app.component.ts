import { Component, OnInit } from '@angular/core';
import { BookFormComponent } from './book-form/book-form.component';
import { Book } from './models/book.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  selectedBook :Book|undefined = undefined;
  books: Book[] | null = null;

  constructor(private dataService: DataService) {
  }

  deleteBook(book: Book) {
    if (book.id) {
      this.dataService.deleteBook(book.id!.toString()).subscribe({
        next: (data: Book) => {
          const index = this.books!.findIndex((b) => b.id === data.id);
          this.books!.splice(index, 1);
        },
        error: (error: any) => console.error(error),
      });
    }
  }
  setModifyBook(book: Book) {
    this.selectedBook = JSON.parse(JSON.stringify(book));
  }
  setNewBook() {
    this.selectedBook = {
      id:undefined,
      author: '',
      genre: '',
      isbn: '',
      language: '',
      pages: 0,
      publication_year: 0,
      publisher: '',
      title: '',
    };
  }
  ngOnInit(): void {
    this.dataService.getBooks().subscribe({
      next: (data: Book[]) => (this.books = data),
      error: (error) => console.log(error),
    });
  }
  saveBook(book: Book) {
    //TODO: messagebox
    if (book.id == undefined) {
      this.dataService.addBook(book).subscribe({
        next: (data:Book) => {
          this.books!.push(data);
          this.selectedBook = undefined;
        },
        error: (error: Error) => console.log(error.message)
      });
    }else{
      this.dataService.modifyBook(book).subscribe({
        next: (data: Book) => {
          let index = this.books!.findIndex((b) => b.id == data.id);
          this.books![index] = data;
          this.selectedBook = undefined;
        },
        error: (error: Error) => console.log(error.message),
      });
    }

  }
}
