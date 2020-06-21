import { Booking } from './booking';

export interface Notice {
    id: number;
    booking?: Booking;
    content: string;
    noticeDate: Date;
}
