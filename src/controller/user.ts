import { Request, Response } from 'express';

import userService from '../service/user';

const signup = async (req: Request, res: Response) => {
  const { email, password, name, countryCode, phoneNumber, agreeTerms } =
    req.body;

  const result = await userService.signup(
    email,
    password,
    name,
    countryCode,
    phoneNumber,
    agreeTerms
  );
  console.log(result);
  res.status(201).json({ message: 'SUCCESS' });
};

export { signup };
