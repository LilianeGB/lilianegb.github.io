import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Cantor } from '../cantor';
import { CantorService } from '../cantor.service';

@Component({
  selector: 'app-cantor-search',
  templateUrl: './cantor-search.component.html',
  styleUrls: [ './cantor-search.component.css' ]
})
export class CantorSearchComponent implements OnInit {
  cantores$: Observable<Cantor[]>;
  private searchTerms = new Subject<string>();

  constructor(private cantorService: CantorService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cantores$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.cantorService.searchCantores(term)),
    );
  }
}