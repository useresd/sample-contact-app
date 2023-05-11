export interface Contact {
    _id: string;
    name: string;
    phone : string;
    address: string;
    notes: string;
}

export const contacts: Contact[] = [];