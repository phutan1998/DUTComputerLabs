import { User } from './user';
import { Booking } from './booking';
import { ComputerLab } from './computer-lab';

export interface Feedback {
    id: number;
    content: string;
    feedbackDate: Date;
    booking?: Booking;
    lab?: ComputerLab;
}
