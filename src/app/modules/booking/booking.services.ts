/* eslint-disable @typescript-eslint/no-unused-vars */
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Facility } from '../facility/facility.model';
import moment from 'moment';
import calculatePayable from '../../utilites/calculatePayable';
import { formatDates, validateDate } from './boooking.utils';

const createBoookingInToBD = async (payload: TBooking) => {
  const facilityDetails = await Facility.findById(payload.facility);

  if (!facilityDetails) {
    throw new Error('Facility not found!');
  }

  const bookings = await Booking.find({
    date: payload.date,
  });

  const requestedStartTime = moment(payload.startTime, 'HH:mm');
  const requestedEndTime = moment(payload.endTime, 'HH:mm');

  for (const booking of bookings) {
    const existingStartTime = moment(booking.startTime, 'HH:mm');
    const existingEndTime = moment(booking.endTime, 'HH:mm');

    const isOverlap =
      requestedStartTime.isBefore(existingEndTime) &&
      requestedEndTime.isAfter(existingStartTime);

    if (isOverlap) {
      throw new Error('The requested time slot is already booked!');
    }
  }

  payload.payableAmount = calculatePayable(
    payload.endTime,
    payload.startTime,
    facilityDetails?.pricePerHour as number,
  );

  const result = await Booking.create(payload);
  return result;
};

const viewAllBookings = async () => {
  const result = await Booking.find().populate('user').populate('facility');
  return result;
};

const viewAllBookingsByUser = async (id?: string) => {
  const result = await Booking.find().populate('facility');
  return result;
};

const cancelBooking = async (id: string) => {
  const result = await Booking.findOneAndUpdate(
    { _id: id },
    { isBooked: 'cancelled' },
    { new: true, runValidators: true },
  ).populate('facility');

  if (!result) {
    throw new Error('Booking not found!!');
  }

  return result;
};

const checkavailabilityBooking = async (dateData: string) => {
  const currentDate = new Date();
  const updateDate = formatDates(currentDate);
  const queryDate = dateData ? dateData : updateDate;
  if (!validateDate(queryDate)) {
    throw new Error('Invalid date format. Date must be in YYYY-MM-dd format.');
  }

  const SlotsDate = await Booking.find({ date: queryDate });
  const bookedTimeSlots = SlotsDate.map((data) => ({
    startTime: data.startTime,
    endTime: data.endTime,
  }));

  let StartTime = '00:00';
  let EndTime = '24:00';

  if (bookedTimeSlots.length === 0) {
    StartTime = '00:00';
    EndTime = '23:59';
  }

  let availableSlots: { startTime: string; endTime: string }[] = [
    { startTime: StartTime, endTime: EndTime },
  ];

  const timeMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Filter out booked time slots from available time slots
  for (const booking of bookedTimeSlots) {
    availableSlots = availableSlots.reduce(
      (result, slot) => {
        const slotStartMinutes = timeMinutes(slot.startTime);
        const slotEndMinutes = timeMinutes(slot.endTime);
        const bookingStartMinutes = timeMinutes(booking.startTime);
        const bookingEndMinutes = timeMinutes(booking.endTime);

        if (
          bookingStartMinutes < slotEndMinutes &&
          bookingEndMinutes > slotStartMinutes
        ) {
          if (slotStartMinutes < bookingStartMinutes) {
            result.push({
              startTime: slot.startTime,
              endTime: booking.startTime,
            });
          }
          if (slotEndMinutes > bookingEndMinutes) {
            result.push({ startTime: booking.endTime, endTime: slot.endTime });
          }
        } else {
          result.push(slot);
        }
        return result;
      },
      [] as { startTime: string; endTime: string }[],
    );
  }

  return availableSlots;
};

export const bookingServives = {
  createBoookingInToBD,
  viewAllBookings,
  viewAllBookingsByUser,
  cancelBooking,
  checkavailabilityBooking,
};
