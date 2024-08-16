import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
  },
  address: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

export const User = mongoose.model<TUser>('user', UserSchema);
