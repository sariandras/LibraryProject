import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/books'

  constructor(private http:HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  addBook(book: Book): Observable<Book>{
    return this.http.post<Book>(this.url, book);
  }

  modifyBook(book: Book): Observable<Book>{
    return this.http.put<Book>(`${this.url}/${book.id}`, book);
  }

  deleteBook(id: string): Observable<Book>{
    return this.http.delete<Book>(`${this.url}/${id}`);
  }
}
