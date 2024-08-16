import express from 'express';
import { bookingController } from './booking.controller';
import auth from '../../middlewear/auth/auth';

const router = express.Router();

router.post('/create-booking', auth('user'), bookingController.createBooking);
router.get('/', auth('admin'), bookingController.viewAllBookings);
router.get('/user', auth('user'), bookingController.viewAllBookingByUser);
router.delete('/:id', auth('user'), bookingController.cancelBooking);
router.get('/check-availability', bookingController.checkAvailability);

export const bookingRoutes = router;
