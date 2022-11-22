import { Request, Response } from 'express';

import { UserService } from '../service/user';

export class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  signup = async (req: Request, res: Response) => {
    const { email, password, name, countryCode, phoneNumber, agreeTerms } =
      req.body;

    await this.userService.signup(
      email,
      password,
      name,
      countryCode,
      phoneNumber,
      agreeTerms
    );

    res.status(201).json({ message: '성공' });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await this.userService.login(email, password);

    res.status(200).json({ token: result });
  };
}
