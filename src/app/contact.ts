export interface Contact {
    id: string;
    name: string;
    phone : string;
    address: string;
    notes: string;
}

export const contacts: Contact[] = [
    {
        id: '1',
        name: 'John Doe',
        phone: '555-555-5555',
        address: '123 Main St, Anytown, USA',
        notes: 'This is a test note for John Doe.'
    },
    {
        id: '2',
        name: 'Jane Doe',
        phone: '555-555-5555',
        address: '123 Main St, Anytown, USA',
        notes: 'This is a test note for Jane Doe.'
    },
    {
        id: '3',
        name: 'John Smith',
        phone: '555-555-5555',
        address: '123 Main St, Anytown, USA',
        notes: 'This is a test note for John Smith.'
    },
    {
        id: '4',
        name: 'Jane Smith',
        phone: '555-555-5555',
        address: '123 Main St, Anytown, USA',
        notes: 'This is a test note for Jane Smith.'
    },
    {
        id: '5',
        name: 'John Doe',
        phone: '555-555-5555',
        address: '123 Main St, Anytown, USA',
        notes: 'This is a test note for John Doe.'
    },
];