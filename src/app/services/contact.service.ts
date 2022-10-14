import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Contact, ContactType, Organization, Person} from './models';
import {CONTACTS} from './contacts';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../directives/sortable.directive';

interface SearchResult {
  contacts: Contact[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(contacts: any[], column: SortColumn, direction: string): Contact[] {
  if (direction === '' || column === '') {
    return contacts;
  } else {
    return [...contacts].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(contact: Contact, term: string) {
  // TODO: Add more properties
  if (contact.type == ContactType.Person) {
    const person = contact as Person;
    return person.firstName.toLowerCase().includes(term.toLowerCase())
    || person.street.toLowerCase().includes(term.toLowerCase())
    || person.city.toLowerCase().includes(term.toLowerCase());
  } else {
    const organization = contact as Organization;
    return organization.name.toLowerCase().includes(term.toLowerCase())
    || organization.street.toLowerCase().includes(term.toLowerCase())
    || organization.city.toLowerCase().includes(term.toLowerCase());
  }
}

@Injectable({providedIn: 'root'})
export class ContactService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(600),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._contacts$.next(result.contacts);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get countries$() { return this._contacts$.asObservable(); }

  get total$() { return this._total$.asObservable(); }

  get loading$() { return this._loading$.asObservable(); }

  get page() { return this._state.page; }
  set page(page: number) { this._set({page}); }

  get pageSize() { return this._state.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }

  get searchTerm() { return this._state.searchTerm; }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }

  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    let contacts = sort(CONTACTS, sortColumn, sortDirection);

    contacts = contacts.filter(contact => matches(contact, searchTerm));
    const total = contacts.length;

    contacts = contacts.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({contacts, total});
  }
}