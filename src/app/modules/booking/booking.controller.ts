import { Request, Response } from 'express';
import catchAsync from '../../utilites/catchAsync';
import sendResponse from '../../utilites/sendResponse';
import httpStatus from 'http-status';
import { bookingServives } from './booking.services';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = req.body;
  const result = await bookingServives.createBoookingInToBD(booking);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved succesfully',
    data: result,
  });
});

const viewAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServives.viewAllBookings();

  sendResponse(res, {
    statusCode: result.length === 0 ? 404 : 200,
    success: result.length === 0 ? false : true,
    message:
      result.length === 0 ? 'No Data Found' : 'Bookings retrieved succesfully',
    data: result,
  });
});

const viewAllBookingByUser = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServives.viewAllBookingsByUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved succesfully',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingServives.viewAllBookingsByUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

const checkAvailability = catchAsync(async (req: Request, res: Response) => {
  const data = req.query.data;

  const result = await bookingServives.checkavailabilityBooking(data as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  viewAllBookings,
  viewAllBookingByUser,
  cancelBooking,
  checkAvailability,
};
