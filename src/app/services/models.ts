export enum ContactType {
    Person = "Person",
    Organization = "Organization"
}

export interface Contact {
    id: number;
    email: string;
    phone?: string;
    type: ContactType;
    street: string;
    city: string;
    country: string;
}

export interface Person extends Contact {
    firstName: string;
    lastName: string;
    birthDate: string;
}

export interface Organization extends Contact {
    name: string;
    registrationNumber: string;
}