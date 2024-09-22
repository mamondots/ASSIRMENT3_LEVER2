import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<TUser>({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'email is required'] },
  password: { type: String, required: [true, 'password is required'] },
  phone: { type: String, required: [true, 'phone is required'] },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  address: { type: String, required: [true, 'address is required'] },
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
