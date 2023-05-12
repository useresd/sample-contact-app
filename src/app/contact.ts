export interface Contact {
    _id: string;
    name: string;
    phone : string;
    address: string;
    notes: string;
    isLocked: boolean
}

export const contacts: Contact[] = [];