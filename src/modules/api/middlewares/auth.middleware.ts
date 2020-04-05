import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '@api/services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService
  ){}

  async use(req: any, res: any, next: () => void) {    
    // validate request
    const user = await this.authService.validateRequest(req);
    req.user = user;
    next();
  }
}
