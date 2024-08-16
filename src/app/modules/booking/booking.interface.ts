import { Types } from 'mongoose';

export type TBooking = {
  date: Date;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'canceled';
};

export type TSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};
