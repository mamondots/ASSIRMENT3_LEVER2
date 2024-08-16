import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.router';
import { facilityRoutes } from './app/modules/facility/facility.route';
import { bookingRoutes } from './app/modules/booking/booking.route';
import { AuthRoutes } from './app/modules/auth/auth.route';

app.use(express.json());
app.use(cors());

//  application routes
app.use('/api', userRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Assirenment 3 serer site is running');
});

export default app;
