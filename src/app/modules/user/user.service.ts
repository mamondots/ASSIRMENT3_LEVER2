import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInToBD = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersInToBD = async () => {
  const result = await User.find();
  return result;
};

export const userService = {
  createUserInToBD,
  getAllUsersInToBD,
};
