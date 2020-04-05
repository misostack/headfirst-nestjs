import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateRequest(req : Request) {
    return false;
  }
}
