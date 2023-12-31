import { Request } from 'express';

export interface UserJwtInterface extends Request {
  user: {
    id: number;
  };
}
