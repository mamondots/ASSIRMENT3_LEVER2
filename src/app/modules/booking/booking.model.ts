import mongoose, { Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: 'facility',
    required: true,
  },
  payableAmount: {
    type: Number,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed',
  },
});

export const Booking = mongoose.model<TBooking>('Booking', bookingSchema);
