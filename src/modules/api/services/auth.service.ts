import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ErrorHelper } from '~/modules/base/helpers';

@Injectable()
export class AuthService {
  async validateRequest(req: Request) : Promise<{id: number}>{
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      return {id: 1};
    } else {
      ErrorHelper.UnauthorizedException('auth.unauthorized');
    }
  }
}
