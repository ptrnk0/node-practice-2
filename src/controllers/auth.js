import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  console.log('in controller1');

  const user = await registerUser(req.body);
  console.log('in controller2');
  res.status(201).json({
    status: 201,
    message: 'user registered successfully',
    data: user,
  });
};
