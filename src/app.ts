import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.router';
import { facilityRoutes } from './app/modules/facility/facility.route';

app.use(express.json());
app.use(cors());

//  application routes
app.use('/api', userRoutes);
app.use('/api/facility', facilityRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Assirenment 3 serer site is running');
});

export default app;
