import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (value) => {
  const user = await UsersCollection.findOne({ email: value.email });
  if (user) {
    throw createHttpError(409, 'user is already exist');
  }
  console.log('in service1');

  const hashedPassword = await bcrypt.hash(value.password, 10);
  console.log('in service2');

  const newUser = await UsersCollection.create({
    ...value,
    password: hashedPassword,
  });
  return newUser;
};
