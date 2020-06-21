import { ComputerLab } from './computer-lab';
import { Feedback } from './feedback';
import { User } from './user';

export interface Booking {
    id: number;
    lab: ComputerLab;
    user?: User;
    bookerName: string;
    bookingDate: Date;
    startAt: number;
    endAt: number;
    status: string;
    description: string;
    feedback: Feedback;
}
