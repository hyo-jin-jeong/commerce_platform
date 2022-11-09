import { Request, Response } from 'express';

import userService from '../service/user';

const signup = async (req: Request, res: Response) => {
  const { email, password, name, countryCode, phoneNumber, agreeTerms } =
    req.body;

  await userService.signup(
    email,
    password,
    name,
    countryCode,
    phoneNumber,
    agreeTerms
  );

  res.status(201).json({ message: 'SUCCESS' });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await userService.login(email, password);

  res.status(200).json({ token: result });
};

export { signup, login };
