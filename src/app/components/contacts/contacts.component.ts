import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { Contact, ContactType, Organization, Person } from 'src/app/services/models';
import { faUser, faBuilding, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import {NgbdSortableHeader, SortEvent} from '../../directives/sortable.directive';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  public contacts$: Observable<any[]>;
  public total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: ContactService) {
    this.contacts$ = service.countries$;
    this.total$ = service.total$;
  }

  public onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  public getIcon(type: string): IconDefinition {
    if (type === ContactType.Person) {
      return faUser;
    } else {
      return faBuilding;
    }
  }

  public getName(contact: Contact): string {
    if (contact.type === ContactType.Person) {
      const person = contact as Person;
      return `${person.firstName} ${person.lastName}`;
    } else {
      const org = contact as Organization;
      return `${org.name}`;
    }
  }

}
