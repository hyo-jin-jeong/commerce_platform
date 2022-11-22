export class StubUserService {
  signup = async () => {};
  login = async () => {
    {
      return 'token';
    }
  };
}
