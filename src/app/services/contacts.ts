// Dummy contacts

import { Contact, Person, Organization, ContactType } from './models';

export const CONTACTS: (Contact|Person|Organization)[] = [
  {
    id: 1,
    type: ContactType.Person,
    email: 'person1@mail.com',
    phone: '+389 88 77 333',
    firstName: 'Tom',
    lastName: 'Jones',
    birthDate: '1980-10-10',
    street: 'Main street 112',
    city: 'Zurich',
    country: 'Switzerland'
  },
  {
    id: 2,
    type: ContactType.Person,
    email: 'person2@mail.com',
    phone: '+389 88 77 444',
    firstName: 'Tom',
    lastName: 'Jones',
    birthDate: '1980-10-10',
    street: 'Third street 20',
    city: 'Basel',
    country: 'Switzerland'
  },
  {
    id: 3,
    type: ContactType.Organization,
    email: 'org3@mail.com',
    phone: '+389 88 77 555',
    name: 'MMC',
    registrationNumber: '90034',
    street: 'Second street 22',
    city: 'Zurich',
    country: 'Switzerland'
  },
  {
    id: 4,
    type: ContactType.Person,
    email: 'person4@mail.com',
    firstName: 'Tom',
    lastName: 'Jones',
    birthDate: '1980-10-10',
    street: 'Main street 112',
    city: 'Zurich',
    country: 'Switzerland'
  },
  {
    id: 5,
    type: ContactType.Person,
    email: 'person5@mail.com',
    firstName: 'Tom',
    lastName: 'Jones',
    birthDate: '1980-10-10',
    street: 'Main street 112',
    city: 'Zurich',
    country: 'Switzerland'
  },
  {
    id: 6,
    type: ContactType.Organization,
    email: 'org6@mail.com',
    phone: '+389 88 77 999',
    name: 'ACME',
    registrationNumber: '1200078',
    street: 'Main street 112',
    city: 'Zurich',
    country: 'Switzerland'
  },
  {
    id: 7,
    type: ContactType.Person,
    email: 'person7@mail.com',
    firstName: 'Ann',
    lastName: 'Jones',
    birthDate: '1980-10-10',
    street: 'Main street 112',
    city: 'Zurich',
    country: 'Switzerland'
  },
  {
    id: 8,
    type: ContactType.Person,
    email: 'person8@mail.com',
    firstName: 'Jan',
    lastName: 'Jones',
    birthDate: '1980-10-10',
    street: 'Second street 1',
    city: 'Basel',
    country: 'Switzerland'
  },
  {
    id: 9,
    type: ContactType.Person,
    email: 'person9@mail.com',
    firstName: 'Mike',
    lastName: 'Tyler',
    birthDate: '1986-5-11',
    street: 'Second street 14',
    city: 'Wienna',
    country: 'Austria'
  }

 
];