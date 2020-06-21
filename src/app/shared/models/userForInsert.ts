import { Faculty } from './faculty';

export interface UserForInsert {
    id: number;
    name: string;
    birthday?: string;
    gender?: boolean;
    faculty?: Faculty;
    phoneNumber?: string;
    email?: string;
    address?: string;
    username: string;
    role: string;
}
