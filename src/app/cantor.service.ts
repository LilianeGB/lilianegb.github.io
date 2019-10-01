import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cantor } from './cantor';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CantorService {

  private cantoresUrl = 'api/cantores';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET cantores from the server */
  getCantores (): Observable<Cantor[]> {
    return this.http.get<Cantor[]>(this.cantoresUrl)
      .pipe(
        tap(_ => this.log('fetched cantores')),
        catchError(this.handleError<Cantor[]>('getCantores', []))
      );
  }

  /** GET cantor by id. Return `undefined` when id not found */
  getCantorNo404<Data>(id: number): Observable<Cantor> {
    const url = `${this.cantoresUrl}/?id=${id}`;
    return this.http.get<Cantor[]>(url)
      .pipe(
        map(cantores => cantores[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} cantor id=${id}`);
        }),
        catchError(this.handleError<Cantor>(`getCantor id=${id}`))
      );
  }

  /** GET cantor by id. Will 404 if id not found */
  getCantor(id: number): Observable<Cantor> {
    const url = `${this.cantoresUrl}/${id}`;
    return this.http.get<Cantor>(url).pipe(
      tap(_ => this.log(`fetched cantor id=${id}`)),
      catchError(this.handleError<Cantor>(`getCantor id=${id}`))
    );
  }

  /* GET whose name contains search term */
  searchCantores(term: string): Observable<Cantor[]> {
    if (!term.trim()) {
      // if not search term, return empty  array.
      return of([]);
    }
    return this.http.get<Cantor[]>(`${this.cantoresUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found cantores matching "${term}"`)),
      catchError(this.handleError<Cantor[]>('searchCantores', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new to the server */
  addCantor (cantor: Cantor): Observable<Cantor> {
    return this.http.post<Cantor>(this.cantoresUrl, cantor, this.httpOptions).pipe(
      tap((newCantor: Cantor) => this.log(`added cantor w/ id=${newCantor.id}`)),
      catchError(this.handleError<Cantor>('addCantor'))
    );
  }

  /** DELETE: delete the  from the server */
  deleteCantor (cantor: Cantor | number): Observable<Cantor> {
    const id = typeof cantor === 'number' ? cantor : cantor.id;
    const url = `${this.cantoresUrl}/${id}`;

    return this.http.delete<Cantor>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted cantor id=${id}`)),
      catchError(this.handleError<Cantor>('deleteCantor'))
    );
  }

  /** PUT: update the  on the server */
  updateCantor (cantor: Cantor): Observable<any> {
    return this.http.put(this.cantoresUrl, cantor, this.httpOptions).pipe(
      tap(_ => this.log(`updated cantor id=${cantor.id}`)),
      catchError(this.handleError<any>('updateCantor'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CantorService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CantorService: ${message}`);
  }
}