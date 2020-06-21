import { Faculty } from './faculty';

export interface User {
    id: number;
    name: string;
    birthday?: Date;
    gender?: string;
    faculty?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    username: string;
    role: string;
}
